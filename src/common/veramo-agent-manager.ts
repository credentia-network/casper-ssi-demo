import { createAgent, IDIDManager, IIdentifier, IResolver, TAgent } from "@veramo/core";
import { CredentialIssuer, ICredentialIssuer } from "@veramo/credential-w3c";
import { DIDManager, MemoryDIDStore } from "@veramo/did-manager";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { KeyManager, MemoryKeyStore, MemoryPrivateKeyStore } from "@veramo/key-manager";
import { KeyManagementSystem } from "@veramo/kms-local";
import { ISelectiveDisclosure, SelectiveDisclosure } from "@veramo/selective-disclosure";
import { BrowserCasperSignerAdapter, CasperDidProvider } from "casper-did-provider";
import { CasperDidResolver } from "casper-did-resolver";
import { CasperClient, CasperServiceByJsonRPC, CLValue, Signer } from "casper-js-sdk";
import { CONTRACT_DID_HASH, DID_PREFIX, NETWORK, RPC_URL, DEPLOY_GAS_PAYMENT, DEPLOY_GAS_PRICE, DEPLOY_TTL_MS, CONTRACT_DEMOVCREGISTRY_HASH } from "./constants";
import * as bs58 from 'bs58';
import { DeployUtil, PublicKey, RuntimeArgs } from "casper-js-sdk";
import { IdentityHelper } from "./helpers/identity-helper";
import MerkleTree from 'merkle-tools';
import ipfsClient from "./ipfs-client";
import { getPublicKeyFromDid } from "./helpers/create-did-key";

export class VeramoAgentManager {
    private static _instance: VeramoAgentManager;
    
    static get instance(): VeramoAgentManager {
        return VeramoAgentManager._instance;
    }

    readonly client = new CasperClient(RPC_URL);
    readonly clientRpc = new CasperServiceByJsonRPC(RPC_URL);

    agent: TAgent<IResolver | ICredentialIssuer | IDIDManager | ISelectiveDisclosure>;
    identifier!: Omit<IIdentifier, 'provider'>;

    private constructor(public readonly publicKeyHex: string) {
        const browserCasperSignerAdapter = new BrowserCasperSignerAdapter(publicKeyHex, publicKeyHex);

        this.agent = createAgent<IResolver | ICredentialIssuer | IDIDManager>({
            plugins: [
                new CredentialIssuer(),
                new SelectiveDisclosure(),
                new KeyManager({
                    store: new MemoryKeyStore(),
                    kms: {
                        local: new KeyManagementSystem(new MemoryPrivateKeyStore()),
                    },
                }),
                new DIDManager({
                    store: new MemoryDIDStore(),
                    defaultProvider: DID_PREFIX,
                    providers: {
                        [DID_PREFIX]: new CasperDidProvider({
                            contract: CONTRACT_DID_HASH,
                            identityKeyHex: publicKeyHex,
                            defaultKms: 'local',
                            gasPrice: 10,
                            network: NETWORK,
                            ttl: 3600000,
                            gasPayment: 50000000000
                        }, browserCasperSignerAdapter, this.client as any, this.clientRpc as any)
                    },
                }),
                new DIDResolverPlugin({
                    resolver: new CasperDidResolver({
                        contract: CONTRACT_DID_HASH,
                        rpcUrl: RPC_URL
                    }) as any,
                }),
            ],
        });    
    }

    static create(publicKeyHex: string): void {
        VeramoAgentManager._instance = new VeramoAgentManager(publicKeyHex);
    }

    async registerDid(did: string, publicKey: string): Promise<any> {
     

        const keyType = 'Ed25519'
        const key = await this.agent.keyManagerCreate({ kms: 'local', type: keyType });

        const result = await this.agent.didManagerAddKey({
            did,
            key: { kid: key.kid, publicKeyHex: publicKey, kms: 'local', type: keyType }
        })
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(e => {
                console.error(e);
                return null;
            });
        return result;
    }

    /**
     * Creates a VC, stores it in IPFS and deploys into the Casper net
     * @returns Ipfs hash
     */
    async createVC(targetPublicKeyHex: string, data: Array<{[key: string]: string}>): Promise<string> {
        console.log('Data');
        console.log(data);
        
        const identifier = await this.agent.didManagerGetOrCreate();

        const jsonLd = this.getJsonLd(data, identifier.did);
        console.log('Json LD');
        console.log(jsonLd);
    
        const vc = this.agent.createVerifiableCredential({ credential: jsonLd, proofFormat: 'jwt' });
        console.log('Verifiable Credential');
        console.log(vc);

        const ipfsResponse = await ipfsClient.add(JSON.stringify(vc));
        console.log('ipfs');
        console.log(ipfsResponse);

        const merkleRoot = this.getMerkleRoot(data);        
        console.log('Merkle Root');
        console.log(merkleRoot.toString());

        await this.writeVC(this.publicKeyHex, targetPublicKeyHex, ipfsResponse.cid.bytes, merkleRoot);

        return ipfsResponse.cid + '';
    }

    async createSdr(fields: string[]) {
        const identifier = await this.agent.didManagerGetOrCreate();

        return this.agent.createSelectiveDisclosureRequest({
            data:   {
                issuer: identifier.did,
                claims: fields.map(t => ({claimType: t}))
            }
        });
    }

    private getJsonLd(data: any, did: string) {
        return {
            "@context": [
                "https://www.w3.org/2018/credentials/v1"
            ],
            type: [
                "VerifiableCredential"
            ],
            issuer: {
                id: did
            },
            issuanceDate: new Date().toISOString(),
            credentialSubject: {
                // "id": accountDid,
                ...data
            }
            // "proof": {
            //     "type": "RsaSignature2018",
            //     "created": "2017-06-18T21:19:10Z",
            //     "proofPurpose": "assertionMethod",
            //     "verificationMethod": "https://example.edu/issuers/keys/1",
            //     "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk- BuQy72IFLOqV0G_zS245 - kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"
            // }
        };
    }

    private getMerkleRoot(data: Array<{[key: string]: string}>): Uint8Array {
        const tree = new MerkleTree({hashType: 'sha256'});
        data.forEach(t => {
            const entry = Object.entries(t)[0];
            tree.addLeaf(entry[1], true);
        });
        tree.makeTree();
        const root = tree.getMerkleRoot();
        if (!root) {
            throw new Error(`Merkle tree is not ready; [Data: ${JSON.stringify(data)}]`);
        }
        return root;
    }

    private writeVC(issuerPublicKeyHex: string, targetPublicKeyHex: string, ipfsHash: Uint8Array, merkleRoot: Uint8Array) {
        const schemaHash = new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]); //TODO: Put here JSON schema hash
        const revocationFlag = true;

        const runtimeArgs = RuntimeArgs.fromMap({
            merkleRoot: CLValue.byteArray(merkleRoot),
            ipfsHash:   CLValue.byteArray(ipfsHash),
            schemaHash: CLValue.byteArray(schemaHash),
            holder:     CLValue.byteArray(IdentityHelper.getIdentityKeyHash(targetPublicKeyHex)),
            revocationFlag:  CLValue.bool(revocationFlag),
        });

        this.deployKey(issuerPublicKeyHex, targetPublicKeyHex, 'issueDemoVC', runtimeArgs);
    }

    private async deployKey(issuerPublicKeyHex: string, targetPublicKeyHex: string, entryPoint: string, runtimeArgs: RuntimeArgs) {
        const contractHashAsByteArray = Buffer.from(CONTRACT_DEMOVCREGISTRY_HASH.slice(5), "hex");
        const publicKey = await Signer.getActivePublicKey().then(pk => IdentityHelper.getIdentityKey(pk));

        const deploy = DeployUtil.makeDeploy(
            new DeployUtil.DeployParams(
                PublicKey.fromEd25519(publicKey),
                NETWORK,
                DEPLOY_GAS_PRICE,
                DEPLOY_TTL_MS
            ),
            DeployUtil.ExecutableDeployItem.newStoredContractByHash(
                contractHashAsByteArray,
                entryPoint,
                runtimeArgs
            ),
            DeployUtil.standardPayment(DEPLOY_GAS_PAYMENT)
        );

        const json = DeployUtil.deployToJson(deploy);        
        const signedDeploy = await Signer.sign(json, issuerPublicKeyHex, targetPublicKeyHex); 
        // await new BrowserCasperSignerAdapter(issuerPublicKeyHex, targetPublicKeyHex).sign(deploy);
        
        console.log("Signed deploy");
        console.log(signedDeploy);
        
        //const deployResult = await this.client.putDeploy(signedDeploy);

        // console.log("Deploy result");
        // console.log(deployResult);
    }
}


/**
 * 
 * 1 Создать лд
2 подписать в верамо и получить часть документа 

"proof": {
            "type": "RsaSignature2018",
            "created": "2017-06-18T21:19:10Z",
            "proofPurpose": "assertionMethod",
            "verificationMethod": "https://example.edu/issuers/keys/1",
            "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk- BuQy72IFLOqV0G_zS245 - kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"
        }
		

3 Отправить его в ipfs
4 взять транзу от ipfs
5 Пописать через каспер этот хеш и отправить в каспер

 */