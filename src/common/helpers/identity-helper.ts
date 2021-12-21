import { decodeBase16, Keys, PublicKey } from "casper-js-sdk";
import { NETWORK } from "../constants";

export class IdentityHelper {
    private constructor() {}

    static hash(identityKeyHex: string): Uint8Array
    static hash(identityKeyHex: string, format: 'hex'): string
    static hash(identityKeyHex: string, format?: 'hex'): string | Uint8Array {
        // if (identityKeyHex.length > 64) {
        //     const algorithm = +identityKeyHex.substr(0, 2);
        //     const arr = decodeBase16(identityKeyHex.substr(2));
        //     return algorithm == 2 ? Keys.Secp256K1.accountHash(arr) : Keys.Ed25519.accountHash(arr);
        // }
        // return Keys.Ed25519.accountHash(decodeBase16(identityKeyHex));
        const hash = PublicKey.fromHex(identityKeyHex).toAccountHash();
        return format == 'hex' ? Buffer.from(hash).toString('hex') : hash;
    }
    
    static getIdentityKey(identityKeyHex: string): Uint8Array {
        //return PublicKey.fromHex(identityKeyHex).toBytes();
        if (identityKeyHex.length > 64) {
            return decodeBase16(identityKeyHex.substr(2));
        }
        return decodeBase16(identityKeyHex);
    }

    static getPublicKeyFromDid(did: string) {
        const arr = did ? did.split(':') : [];
        return arr.length ? arr[arr.length - 1] : null;
    }

    static createDidKey(publicKey: string) {
        return `did:casper:${NETWORK}:${publicKey}`;
    }
}