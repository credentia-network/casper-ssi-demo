import { createAgent } from "@veramo/core";
import { CredentialIssuer } from "@veramo/credential-w3c";
import { DIDManager, MemoryDIDStore } from "@veramo/did-manager";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { KeyManager, MemoryKeyStore, MemoryPrivateKeyStore } from '@veramo/key-manager';
import { KeyManagementSystem } from '@veramo/kms-local';
import { BrowserCasperSignerAdapter, CasperDidProvider } from "casper-did-provider";
import { CasperDidResolver } from "casper-did-resolver";
import { CasperClient, CasperServiceByJsonRPC } from "casper-js-sdk";
import { CONTRACT_DID_HASH, NETWORK, RPC_URL } from "./constants";


export class VeramoManager {
    private _agent?: any;
    browserCasperSignerAdapter?: BrowserCasperSignerAdapter;
    activeKey?: any;

    get agent() {
        if (!this._agent) {
            throw new Error('VeramoManager: Agent is not initialized');
        }
        return this._agent;
    }


    constructor() {
        //const identityKey: any = Keys.Ed25519.parseKeyPair(PUBLIC_KEY, PRIVATE_KEY);

        window.addEventListener('signer:unlocked', (event: any) => {
            if (event.detail.activeKey) {
                this.activeKey = event.detail.activeKey;
                this.initAgent(event.detail.activeKey);
            }
        });
    }

    async resolveDid(did: string): Promise<any> {
        const result = await this.agent.methods.resolveDid({
            didUrl: did
        }, null)
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

    async registerDid(did: string, publicKey: string): Promise<any> {
        const keyType = 'Ed25519'
        const key = await this.agent.methods.keyManagerCreate({ kms: 'local', type: keyType }, null);

        const result = await this.agent.methods.didManagerAddKey({
            did,
            key: { kid: key.kid, publicKeyHex: publicKey }
        }, null)
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

    createDid(publicKey: string) {
        return `did:casper:${NETWORK}:${publicKey}`;
    }

    sign(payload: any, targetDid: string) {
        const ci = new CredentialIssuer();
        const vc = {
            "@context": [
                "https://www.w3.org/2018/credentials/v1",
                "https://www.w3.org/2018/credentials/examples/v1"
            ],
            "id": "http://example.edu/credentials/1872",
            "type": ["VerifiableCredential", "AlumniCredential"],
            "issuer": this.activeKey,
            "issuanceDate": new Date().toString(),
            "credentialSubject": {
                "id": targetDid,
                ...payload
            }
        };

        return ci.createVerifiableCredential({ credential: vc } as any, this._agent?.context)
            .then(data => this.browserCasperSignerAdapter?.sign(data));
    }

    private initAgent(identityKey: string) {
        const client = new CasperClient(RPC_URL);
        const clientRpc = new CasperServiceByJsonRPC(RPC_URL);

        this.browserCasperSignerAdapter = new BrowserCasperSignerAdapter(identityKey, identityKey);

        this._agent = createAgent({
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
                            identityKeyHex: identityKey,
                            defaultKms: 'local',
                            gasPrice: 10,
                            network: NETWORK,
                            ttl: 3600000,
                            gasPayment: 50000000000
                        }, this.browserCasperSignerAdapter, client as any, clientRpc as any)
                    },
                }),
                new DIDResolverPlugin({
                    resolver: new CasperDidResolver({
                        contract: CONTRACT_DID_HASH,
                        rpcUrl: RPC_URL
                    }) as any,
                }),
            ],
        }) as any;
        console.log('Veramo agent initialized.');
    }
}

const veramoManager = new VeramoManager();

export default veramoManager;