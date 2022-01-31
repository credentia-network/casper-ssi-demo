import { create, IPFSHTTPClient } from "ipfs-http-client";
import * as IPFS from "ipfs-http-client";

class IpfsClient {
    private readonly client: IPFSHTTPClient;

    constructor() {
        this.client = create({
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
        });
    }

    /**
     * Adds data to Ipfs network
     * @param data Any data
     * @returns File id
     */
    async add(data: any): Promise<Uint8Array> {
        const ipfsResponse = await this.client.add(JSON.stringify(data));
        return ipfsResponse.cid.bytes.slice(2);
    }

    /**
     * Reads data from Ipfs network
     * @param cid File id
     * @returns Returns parsed data or null
     */
    async readHash(cid: IPFS.CID): Promise<any> {
        for await (const buf of this.client.cat(cid)) {
            const str = Buffer.from(buf).toString();
            return JSON.parse(str);
        }
        return null;
    }

    /**
     * Decodes CID
     * @param hash array of bytes
     * @returns Returns File ID
     */
    decodeCid(hash: Uint8Array): IPFS.CID {
        if (!hash) {
            throw new Error('hash parameter is requred');
        }

        const buffer = new Uint8Array([18, 32, ...hash as any]);
        return IPFS.CID.decode(buffer);
    }
}

const ipfsClient = new IpfsClient();

export default ipfsClient;