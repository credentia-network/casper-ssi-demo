
export function truncDid(did: string): string {
    return `${did.substring(0, 27)}...${did.substring(did.length - 4)}`;
}
