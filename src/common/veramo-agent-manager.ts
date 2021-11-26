import { createAgent, IDIDManager, IIdentifier, IResolver, TAgent } from "@veramo/core";
import { CredentialIssuer, ICredentialIssuer } from "@veramo/credential-w3c";
import { DIDManager, MemoryDIDStore } from "@veramo/did-manager";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { KeyManager, MemoryKeyStore, MemoryPrivateKeyStore } from "@veramo/key-manager";
import { KeyManagementSystem } from "@veramo/kms-local";
import { BrowserCasperSignerAdapter, CasperDidProvider } from "casper-did-provider";
import { CasperDidResolver } from "casper-did-resolver";
import { CasperClient, CasperServiceByJsonRPC } from "casper-js-sdk";
import { CONTRACT_DID_HASH, NETWORK, RPC_URL } from "./constants";

export class VeramoAgentManager {
    agent: TAgent<IResolver | ICredentialIssuer | IDIDManager>;
    identifier!: Omit<IIdentifier, 'provider'>;

    constructor(publicKeyHex: string) {
        const client = new CasperClient(RPC_URL);
        const clientRpc = new CasperServiceByJsonRPC(RPC_URL);
        const browserCasperSignerAdapter = new BrowserCasperSignerAdapter(publicKeyHex, publicKeyHex);

        this.agent = createAgent<IResolver | ICredentialIssuer | IDIDManager>({
            plugins: [
                new CredentialIssuer(),
                new KeyManager({
                    store: new MemoryKeyStore(),
                    kms: {
                        local: new KeyManagementSystem(new MemoryPrivateKeyStore()),
                    },
                }),
                new DIDManager({
                    store: new MemoryDIDStore(),
                    defaultProvider: 'did:casper',
                    providers: {
                        'did:casper': new CasperDidProvider({
                            contract: CONTRACT_DID_HASH,
                            identityKeyHex: publicKeyHex,
                            defaultKms: 'local',
                            gasPrice: 10,
                            network: NETWORK,
                            ttl: 3600000,
                            gasPayment: 50000000000
                        }, browserCasperSignerAdapter, client as any, clientRpc as any)
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

    async createVC(data: any): Promise<any> {
        const identifier = await this.agent.didManagerGetOrCreate();

        const jsonLd = this.getJsonLd(data, identifier.did);
    
        return this.agent.createVerifiableCredential({ credential: jsonLd, proofFormat: 'jwt' });
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