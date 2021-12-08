import { decodeBase16, Keys } from "casper-js-sdk";

export class IdentityHelper {
    private constructor() {}

    static getIdentityKeyHash(identityKeyHex: string): Uint8Array {
        if (identityKeyHex.length > 64) {
            const algorithm = +identityKeyHex.substr(0, 2);
            const arr = decodeBase16(identityKeyHex.substr(2));
            return algorithm == 2 ? Keys.Secp256K1.accountHash(arr) : Keys.Ed25519.accountHash(arr);
        }
        return Keys.Ed25519.accountHash(decodeBase16(identityKeyHex));
    }
    
    static getIdentityKey(identityKeyHex: string): Uint8Array {
        if (identityKeyHex.length > 64) {
            return decodeBase16(identityKeyHex.substr(2));
        }
        return decodeBase16(identityKeyHex);
    }
}