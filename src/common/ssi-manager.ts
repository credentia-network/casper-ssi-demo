import { createAgent, IDataStore, IDIDManager, IIdentifier, IResolver, TAgent } from "@veramo/core";
import { CredentialIssuer, ICredentialIssuer } from "@veramo/credential-w3c";
import { DIDManager, MemoryDIDStore } from "@veramo/did-manager";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { KeyManager, MemoryKeyStore, MemoryPrivateKeyStore } from "@veramo/key-manager";
import { KeyManagementSystem } from "@veramo/kms-local";
import { ISelectiveDisclosure, SelectiveDisclosure } from "@veramo/selective-disclosure";
import { BrowserCasperSignerAdapter, CasperDidProvider } from "casper-did-provider";
import { CasperDidResolver } from "casper-did-resolver";
import { CasperClient, CasperServiceByJsonRPC, CLValue, DeployUtil, PublicKey, RuntimeArgs, Signer } from "casper-js-sdk";
import dayjs from "dayjs";
import * as IPFS from "ipfs-http-client";
import MerkleTree from 'merkle-tools';
import { vcListAction } from "./actions/vc-list";
import { CONTRACT_DEMOVCREGISTRY_HASH, CONTRACT_DID_HASH, DEPLOY_GAS_PAYMENT, DEPLOY_GAS_PRICE, DEPLOY_TTL_MS, DID_PREFIX, NETWORK, RPC_URL } from "./constants";
import { VerifiableCredentials } from "./contracts/verifiable-credentials";
import { VerifiablePresentationRequest } from "./contracts/verifiable-presentation-request";
import { IdentityHelper } from "./helpers/identity-helper";
import { IndexDbDataDtore } from "./indexdb-data-store";
import ipfsClient from "./ipfs-client";
import { store } from "./store";
import { verifyJWT } from 'did-jwt';
import { vpRequestHolderAction } from "./actions/vp-request-holder";

export class SsiManager {
    private static _instance: SsiManager;

    static get instance(): SsiManager {
        return SsiManager._instance;
    }

    readonly client = new CasperClient(RPC_URL);
    readonly clientRpc = new CasperServiceByJsonRPC(RPC_URL);

    agent: TAgent<IResolver | ICredentialIssuer | IDIDManager | ISelectiveDisclosure | IDataStore>;
    identifier!: Omit<IIdentifier, 'provider'>;

    private constructor(public readonly publicKeyHex: string) {
        const browserCasperSignerAdapter = new BrowserCasperSignerAdapter(publicKeyHex, publicKeyHex);

        this.agent = createAgent<IResolver | ICredentialIssuer | IDIDManager | IDataStore>({
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
                    defaultProvider: `${DID_PREFIX}:${NETWORK}`,
                    providers: {
                        [`${DID_PREFIX}:${NETWORK}`]: new CasperDidProvider({
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
                new IndexDbDataDtore()
            ],
        });

        this.readVCRegistry()
            .then(data => store.dispatch(vcListAction(data)));

        this.readVPRequestRegistry()
            .then(data => {
                console.log('readVPRegistry');
                console.log(data)
            });

        this.loadLinkedVcRegistry()
            .then(data => {
                store.dispatch(vpRequestHolderAction(data))
            });
    }

    static create(publicKeyHex: string): void {
        SsiManager._instance = new SsiManager(publicKeyHex);
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
    async createVC(targetPublicKeyHex: string, data: Array<{ [key: string]: string }>, validDate?: string | null): Promise<string> {
        console.log('Data');
        console.log(data);

        const identifier = await this.agent.didManagerGetOrCreate();

        const jsonLd = this.getJsonLd(data, identifier.did, validDate);
        console.log('Json LD');
        console.log(jsonLd);

        const vc = await this.agent.createVerifiableCredential({ credential: jsonLd, proofFormat: 'jwt' });
        console.log('Verifiable Credential');
        console.log(vc);

        const ipfsResponse = await ipfsClient.add(JSON.stringify(vc));
        const ipfsHash = ipfsResponse.cid.bytes.slice(2);
        console.log('ipfs');
        console.log(ipfsResponse.cid + '');

        const merkleRoot = this.getMerkleRoot(data);
        console.log('Merkle Root');
        console.log(merkleRoot.toString());

        await this.writeVC(this.publicKeyHex, targetPublicKeyHex, ipfsHash, merkleRoot);

        return ipfsResponse.cid + '';
    }

    async createVPRequest(fields: string[], holderPaublicKeyHex: string) {
        const identifier = await this.agent.didManagerGetOrCreate();

        const sdr = await this.agent.createSelectiveDisclosureRequest({
            data: {
                issuer: identifier.did,
                claims: fields.map(t => ({ claimType: t }))
            }
        });

        console.log('SDR hash');
        console.log(sdr);

        const ipfsResponse = await ipfsClient.add(JSON.stringify(sdr));
        const ipfsHash = ipfsResponse.cid.bytes.slice(2);
        console.log('ipfs');
        console.log(ipfsResponse.cid + '');

        this.writeVPRequest(this.publicKeyHex, ipfsHash, holderPaublicKeyHex);
    }

    // async createVP(sdr: string) {
    //     // this.agent.getVerifiableCredentialsForSdr();
    //     this.agent.createVerifiablePresentation({
    //         presentation: {
    //             verifiableCredential: 
    //         }
    //     })
    //     const  verifiesJwt = await verifyJWT(sdr);
    //     this.agent.getVerifiableCredentialsForSdr({sdr: verifiesJwt.payload})
    // }

    private getJsonLd(data: any, did: string, expirationDate?: string | null) {
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
            expirationDate: expirationDate ? dayjs(expirationDate, 'YYYY-MM-DD').toISOString() : undefined,
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

    private getMerkleRoot(data: Array<{ [key: string]: string }>): Uint8Array {
        const tree = new MerkleTree({ hashType: 'sha256' });
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

    private async writeVC(issuerPublicKeyHex: string, targetPublicKeyHex: string, ipfsHash: Uint8Array, merkleRoot: Uint8Array) {
        const schemaHash = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); //TODO: Put here JSON schema hash
        const revocationFlag = true;

        const runtimeArgs = RuntimeArgs.fromMap({
            merkleRoot: CLValue.byteArray(merkleRoot),
            ipfsHash: CLValue.byteArray(ipfsHash),
            schemaHash: CLValue.byteArray(schemaHash),
            holder: CLValue.byteArray(IdentityHelper.hash(targetPublicKeyHex)),
            revocationFlag: CLValue.bool(revocationFlag),
        });

        await this.deployKey(issuerPublicKeyHex, targetPublicKeyHex, 'issueDemoVC', runtimeArgs);
    }

    private writeVPRequest(senderPublicKeyHex: string, ipfsHash: Uint8Array, holderPublicKeyHex: string) {
        const status = 0;
        const ipfsHashResponce = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        const runtimeArgs = RuntimeArgs.fromMap({
            ipfsHash: CLValue.byteArray(ipfsHash),
            ipfsHashResponce: CLValue.byteArray(ipfsHashResponce),
            holder: CLValue.byteArray(IdentityHelper.hash(holderPublicKeyHex)),
            status: CLValue.u8(status),
        });
        this.deployKey(senderPublicKeyHex, holderPublicKeyHex, 'sendVPRequest', runtimeArgs);
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

        console.log("Signed deploy");
        console.log(signedDeploy);

        const deployObj = DeployUtil.deployFromJson(signedDeploy);

        if (deployObj) {
            const deployResult = await this.client.putDeploy(deployObj);

            console.log("Deploy result");
            console.log(deployResult);
        }
    }

    private async readVCRegistry(): Promise<VerifiableCredentials[]> {
        const stateRootHash = await (this.clientRpc as any).getStateRootHash();
        const pubKey = await Signer.getActivePublicKey();
        const issuerHash = Buffer.from(IdentityHelper.hash(pubKey)).toString('hex');

        const vc_length_key = `VC_length_${issuerHash}`;
        const vcLength: number = await this.clientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_length_key])
            .then(data => {
                return data.CLValue?.asBigNumber().toNumber() || 0;
            })
            .catch(() => 0);

        if (!vcLength) {
            return [];
        }

        return Promise.all(new Array(vcLength).fill(0).map(async (_, index) => {
            const vc_ipfsHash_key = `VC_${issuerHash}_${index}_ipfsHash`;
            const vc_holder_key = `VC_${issuerHash}_${index}_holder`;

            const holderArr = await this.clientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_holder_key])
                .then(data => data.CLValue!.asBytesArray());

            const holderPubKey = Buffer.from(holderArr).toString('hex');

            return this.readVCByKey(vc_ipfsHash_key, holderPubKey, stateRootHash);

            // return this.clientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_ipfsHash_key])
            //     .then(data => data ? data.CLValue?.asBytesArray() : null)
            //     .then(hash => hash ? this.readIpfsData(hash) : null)
            //     .then(data => data ? this.mapVcObject(data, holderPubKey) : null)
            //     .catch(e => {
            //         console.error(e);
            //         return null;
            //     });
        })).then(data => data.filter(t => !!t) as VerifiableCredentials[]);
    }

    private async readVCByKey(key: string, holderPubKey: string, stateRootHash: any): Promise<VerifiableCredentials | null> {
        return this.clientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [key])
            .then(data => data ? data.CLValue?.asBytesArray() : null)
            .then(hash => hash ? this.readIpfsData(hash) : null)
            .then(data => data ? this.mapVcObject(data, holderPubKey) : null)
            .catch(e => {
                console.error(e);
                return null;
            });
    }

    private async readIpfsData(ipfsHashe: Uint8Array) {
        if (!ipfsHashe) {
            return null;
        }
        const buf = new Uint8Array([18, 32, ...ipfsHashe as any]);
        const cid = IPFS.CID.decode(buf);
        for await (const buf of ipfsClient.cat(cid)) {
            const str = Buffer.from(buf).toString();
            const obj = str ? JSON.parse(str) : null;
            if (obj) {
                obj.ipfsHash = cid + '';
                return obj;
            }
        }
        return null;
    }

    private mapVcObject(data: any, holderPubKey: string | null): VerifiableCredentials | null {
        if (!data) {
            return null;
        }
        const now = new Date().valueOf();
        return {
            active: !data.expirationDate || new Date(data.expirationDate).valueOf() > now,
            did: holderPubKey ? IdentityHelper.createDidKey(holderPubKey) : '',
            createDate: data.issuanceDate,
            deactivateDate: data.expirationDate || null,
            vcId: data.ipfsHash,
            vc: data
        };
    }

    private async readVPRequestRegistry(): Promise<VerifiablePresentationRequest[]> {
        const stateRootHash = await (this.clientRpc as any).getStateRootHash();
        const pubKey = await Signer.getActivePublicKey();
        const issuerHash = IdentityHelper.hash(pubKey, 'hex');

        const vc_length_key = `VPRequest_length_${issuerHash}`;
        const vcLength: number = await this.clientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_length_key])
            .then(data => {
                return data.CLValue?.asBigNumber().toNumber() || 0;
            })
            .catch(() => 0);

        if (!vcLength) {
            return [];
        }

        return Promise.all(new Array(vcLength).fill(0).map((_, index) => {
            const vc_ipfsHash_key = `VPRequest_${issuerHash}_${index}_ipfsHash`;

            return this.clientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_ipfsHash_key])
                .then(data => data ? data.CLValue?.asBytesArray() : null)
                .then(hash => hash ? this.readSdrFromIpfs(hash) : null)
                .then(data => data ? this.mapVPRequestObject(data) : null)
                .catch(e => {
                    console.error(e);
                    return null;
                });
        })).then(data => data.filter(t => !!t) as VerifiablePresentationRequest[]);
    }

    private async readSdrFromIpfs(ipfsHashe: Uint8Array) {
        if (!ipfsHashe) {
            return null;
        }
        const buf = new Uint8Array([18, 32, ...ipfsHashe as any]);
        const cid = IPFS.CID.decode(buf);
        for await (const buf of ipfsClient.cat(cid)) {
            return Buffer.from(buf).toString();
        }
        return null;
    }

    private mapVPRequestObject(data: any) {
        console.log('mapVPRequestObject');
        console.log(data);
        return data;
    }

    private async loadLinkedVcRegistry() {
        const stateRootHash = await (this.clientRpc as any).getStateRootHash();
        const pubKey = await Signer.getActivePublicKey();
        const hash = IdentityHelper.hash(pubKey, 'hex');

        const vc_length_key = `VCLink_length_${hash}`;
        const vcLength: number = await this.clientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_length_key])
            .then(data => data.CLValue?.asBigNumber().toNumber() || 0)
            .catch(() => 0);

        if (vcLength) {
            return Promise.all(new Array(vcLength).fill(0).map((_, index) => {
                const vc_link_key = `VCLink_${hash}_${index}`;

                return this.clientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_link_key])
                    .then(data => data ? data.CLValue?.asString() : null)
                    .catch(() => null)
                    .then(link => {
                        if (link) {
                            link = `${link}ipfsHash`;
                            return this.clientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [link]);
                        }
                        return null;
                    })
                    .then(data => data ? data.CLValue?.asBytesArray() : null)
                    .then(hash => hash ? this.readIpfsData(hash) : null)
                    .then(vc => {
                        if (vc)
                            return this.agent.dataStoreSaveVerifiableCredential({ verifiableCredential: vc }).then(() => vc);
                        return vc;
                    });
            }))
                .then(data => data.filter(t => !!t));
        }

        return [];
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
5 Прописать через каспер этот хеш и отправить в каспер

 */

/**
09.12.2021
VC ID - идентификатор VC - можно взять меркель рут/либо ее хеш
Valid until -  дорисовать поде даты, его юзер установит (опционально)
Issue date -  взять после верамо proof.created

 */