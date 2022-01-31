import { createAgent, IDataStore, IDIDManager, IResolver, TAgent } from "@veramo/core";
import { CredentialIssuer, ICredentialIssuer } from "@veramo/credential-w3c";
import { DIDManager, MemoryDIDStore } from "@veramo/did-manager";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { KeyManager, MemoryKeyStore, MemoryPrivateKeyStore } from "@veramo/key-manager";
import { KeyManagementSystem } from "@veramo/kms-local";
import { ISelectiveDisclosure, SelectiveDisclosure } from "@veramo/selective-disclosure";
import { BrowserCasperSignerAdapter, CasperDidProvider } from "casper-did-provider";
import { CasperDidResolver } from "casper-did-resolver";
import { casperClient, casperClientRpc } from "./casper-client";
import { CONTRACT_DID_HASH, DID_PREFIX, NETWORK, RPC_URL } from "./constants";
import { IndexDbDataDtore } from "./indexdb-data-store";

let agent: TAgent<IResolver | ICredentialIssuer | IDIDManager | ISelectiveDisclosure | IDataStore>;

export default class VeramoManager {
    static get agent() {
        return agent;
    }

    static createVeramoAgent(publicKeyHex: string) {
        const browserCasperSignerAdapter = new BrowserCasperSignerAdapter(publicKeyHex, publicKeyHex);
    
        agent = createAgent<IResolver | ICredentialIssuer | IDIDManager | ISelectiveDisclosure | IDataStore>({
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
                        }, browserCasperSignerAdapter, casperClient as any, casperClientRpc as any)
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
    }
}