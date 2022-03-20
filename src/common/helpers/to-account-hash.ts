import { CLPublicKey } from "casper-js-sdk";

export function toAccountHash(publicKeyHex: string): string {
    const bytes = CLPublicKey.fromHex(publicKeyHex).toAccountHash();
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}