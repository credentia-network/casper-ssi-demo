import { IAgentPlugin, IDataStore, IDataStoreDeleteVerifiableCredentialArgs, IDataStoreGetMessageArgs, IDataStoreGetVerifiableCredentialArgs, IDataStoreGetVerifiablePresentationArgs, IDataStoreSaveMessageArgs, IDataStoreSaveVerifiableCredentialArgs, IDataStoreSaveVerifiablePresentationArgs, IMessage, VerifiableCredential, VerifiablePresentation } from "@veramo/core";
import { blake2bHex } from 'blakejs';


export class IndexDbDataDtore implements IAgentPlugin {
    private readonly claimsStoreName = "claims";
    private readonly messagesStoreName = "messages";
    private readonly credentialsStoreName = "credentials";
    private readonly presentationsStoreName = "presentations";
    private readonly credentialClaimsIndexName = "credential_claims_idx";

    private db: IDBDatabase;
    readonly methods: IDataStore;

    constructor() {
        this.methods = {
            dataStoreSaveMessage: this.dataStoreSaveMessage.bind(this),
            dataStoreGetMessage: this.dataStoreGetMessage.bind(this),
            dataStoreDeleteVerifiableCredential: this.dataStoreDeleteVerifiableCredential.bind(this),
            dataStoreSaveVerifiableCredential: this.dataStoreSaveVerifiableCredential.bind(this),
            dataStoreGetVerifiableCredential: this.dataStoreGetVerifiableCredential.bind(this),
            dataStoreSaveVerifiablePresentation: this.dataStoreSaveVerifiablePresentation.bind(this),
            dataStoreGetVerifiablePresentation: this.dataStoreGetVerifiablePresentation.bind(this),
        }

        const request = indexedDB.open("ssi", 2);
        request.onerror = function (event) {
            console.log("Couldn't initialize IndexedDB!");
        };
        request.onsuccess = (event: any) => {
            this.db = event.target.result;
        };

        request.onupgradeneeded = () => {
            this.db = request.result;
            if (!this.db.objectStoreNames.contains(this.messagesStoreName)) {
                this.db.createObjectStore(this.messagesStoreName, { keyPath: "id" });
            }
            if (!this.db.objectStoreNames.contains(this.claimsStoreName)) {
                const claims = this.db.createObjectStore(this.claimsStoreName, { keyPath: "hash" });
                claims.createIndex(this.credentialClaimsIndexName, 'credential');
            }
            if (!this.db.objectStoreNames.contains(this.credentialsStoreName)) {
                this.db.createObjectStore(this.credentialsStoreName, { keyPath: "hash" });
            }
            if (!this.db.objectStoreNames.contains(this.presentationsStoreName)) {
                this.db.createObjectStore(this.presentationsStoreName, { keyPath: "hash" });
            }
        }
    }   

    /*
                    IDataStore
    */
    async dataStoreSaveMessage(args: IDataStoreSaveMessageArgs): Promise<string> {
        await this.put(this.messagesStoreName, args.message);
        return args.message.id;
    }

    async dataStoreGetMessage(args: IDataStoreGetMessageArgs): Promise<IMessage> {
        return this.get(this.messagesStoreName, args.id)
            .then(result => result ?? Promise.reject(new Error('Message not found')));
    }

    async dataStoreDeleteVerifiableCredential(
        args: IDataStoreDeleteVerifiableCredentialArgs,
    ): Promise<boolean> {
        const claimId = await this.findKeyByIndex(this.claimsStoreName, this.credentialClaimsIndexName, args.hash);
        await this.remove(this.claimsStoreName, claimId);

        await this.remove(this.credentialsStoreName, args.hash);

        return true
    }

    async dataStoreSaveVerifiableCredential(args: IDataStoreSaveVerifiableCredentialArgs): Promise<string> {
        args.verifiableCredential.hash = this.createKey(args.verifiableCredential);
        await this.put(this.credentialsStoreName, args.verifiableCredential);
        return args.verifiableCredential.hash;
    }

    async dataStoreGetVerifiableCredential(
        args: IDataStoreGetVerifiableCredentialArgs,
    ): Promise<VerifiableCredential> {
        return this.get(this.credentialsStoreName, args.hash)
            .then(result => result || Promise.reject(new Error('Verifiable credential not found')));
    }

    async dataStoreSaveVerifiablePresentation(args: IDataStoreSaveVerifiablePresentationArgs): Promise<string> {
        args.verifiablePresentation.hash = this.createKey(args.verifiablePresentation);
        await this.put(this.presentationsStoreName, args.verifiablePresentation);
        return args.verifiablePresentation.hash;
    }

    async dataStoreGetVerifiablePresentation(
        args: IDataStoreGetVerifiablePresentationArgs,
    ): Promise<VerifiablePresentation> {
        return this.get(this.presentationsStoreName, args.hash)
            .then(result => result && Promise.reject(new Error('Verifiable presentation not found')));
    }

    private put(storeName: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const messagesStore = this.db.transaction(storeName, 'readwrite').objectStore(storeName);

            const request = messagesStore.put(value);
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        });
    }

    private get(storeName: string, key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const messagesStore = this.db.transaction(storeName, 'readonly').objectStore(storeName);

            const request = messagesStore.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        });
    }

    private remove(storeName: string, key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const messagesStore = this.db.transaction(storeName, 'readwrite').objectStore(storeName);

            const request = messagesStore.delete(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        });
    }

    private findKeyByIndex(storeName: string, indexName: string, key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const claimsStore = this.db.transaction(storeName, 'readonly').objectStore(storeName);
            const request = claimsStore.index(indexName).getKey(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        });
    }

    private createKey(value: any): string {
        return blake2bHex(JSON.stringify(value));
    }
}