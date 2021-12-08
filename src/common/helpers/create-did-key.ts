import { NETWORK } from "../constants";

export function createDidKey(publicKey: string) {
    return `did:casper:${NETWORK}:${publicKey}`;
}

export function getPublicKeyFromDid(did: string): string {
    return did.split(':')[3];
}
