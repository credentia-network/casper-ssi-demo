import { NETWORK } from "../constants";

export function createDidKey(publicKey: string) {
    return `did:casper:${NETWORK}:${publicKey}`;
}
