import { CasperDidProvider } from "casper-did-provider";
import { createAgent } from "@veramo/core";
import { DIDManager, MemoryDIDStore } from "@veramo/did-manager";
import { Keys } from "casper-js-sdk";
import { KeyManager, MemoryKeyStore, MemoryPrivateKeyStore } from '@veramo/key-manager';
import { KeyManagementSystem } from '@veramo/kms-local';
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { CasperDidResolver } from "casper-did-resolver";


const PUBLIC_KEY = Keys.Ed25519.readBase64WithPEM('MCowBQYDK2VwAyEANUSxkqzpKbbhYVMo0bP3nVe+gen4jFp06Ki5u6cIATk=');

const PRIVATE_KEY = Keys.Ed25519.readBase64WithPEM('MC4CAQAwBQYDK2VwBCIEIAdjynMSLimFalVdB51TI6wGlwQKaI8PwdsG55t2qMZM');

const RPC_URL = 'http://144.76.97.151:7777/rpc';

const CONTRACT = 'CasperDIDRegistry9';

const NETWORK = 'casper-test';


export class VeramoManager {
    static readonly instance = new VeramoManager();

    private readonly agent;

    private constructor() {
        const contractKey: any = Keys.Ed25519.parseKeyPair(PUBLIC_KEY, PRIVATE_KEY);
        const identityKey: any = Keys.Ed25519.parseKeyPair(PUBLIC_KEY, PRIVATE_KEY);

        this.agent = createAgent({
            plugins: [
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
                            contract: CONTRACT,
                            contractKey,
                            identityKey,
                            rpcUrl: RPC_URL,
                            defaultKms: 'local',
                            gasPrice: 10,
                            network: NETWORK,
                            ttl: 3600000,
                            gasPayment: 50000000000
                        })
                    },
                }),
                new DIDResolverPlugin({
                    resolver: new CasperDidResolver({
                        contract: CONTRACT,
                        contractKey,
                        identityKey,
                        rpcUrl: RPC_URL
                    }),
                }),
            ],
        });
    }

    async resolveDid(did: string): Promise<any> {
        const result = await this.agent.resolveDid({
            didUrl: did
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

    async registerDid(did: string, publicKey: string): Promise<any> {
        const keyType = 'Ed25519'
        const key = await this.agent.keyManagerCreate({ kms: 'local', type: keyType });

        const result = await this.agent.didManagerAddKey({
            did,
            key: { kid: key.kid, publicKeyHex: publicKey }
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

    createDid(publicKey: string) {
        return `did:casper:${NETWORK}:${publicKey}`;
    }
}
