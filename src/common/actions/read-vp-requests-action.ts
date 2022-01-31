import { Signer } from "casper-js-sdk";
import { casperClientRpc } from "../casper-client";
import { CONTRACT_DEMOVCREGISTRY_HASH } from "../constants";
import { VerifiablePresentationRequest } from "../contracts/verifiable-presentation-request";
import { IdentityHelper } from "../helpers/identity-helper";
import ipfsClient from "../ipfs-client";
import { VP_REQUESTS } from "../reducers/types";
import { decodeJWT } from 'did-jwt';

export function readVpRequestAction() {
    return async function (dispatch) {
        const payload = await readVPRequestRegistry();
        dispatch({
            type: VP_REQUESTS,
            payload
        });
    }
}

async function readVPRequestRegistry(): Promise<VerifiablePresentationRequest[]> {
    const stateRootHash = await (casperClientRpc as any).getStateRootHash();
    const pubKey = await Signer.getActivePublicKey();
    const issuerHash = IdentityHelper.hash(pubKey, 'hex');

    const length_key = `VPRequest_length_${issuerHash}`;
    const vcLength: number = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [length_key])
        .then(data => data.CLValue?.asBigNumber().toNumber() || 0)
        .catch(() => 0);

    if (!vcLength) {
        return [];
    }

    const readDataFn = async (index): Promise<VerifiablePresentationRequest | null> => {
        const ipfsHash_key = `VPRequest_${issuerHash}_${index}_ipfsHash`;
        const holder_key = `VPRequest_${issuerHash}_${index}_holder`;
        const status_key = `VPRequest_${issuerHash}_${index}_status`;

        try {
            const vpRequest: any = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [ipfsHash_key])
                .then(data => data.CLValue?.asBytesArray() || null)
                .then(hash => hash ? readSdrFromIpfs(hash) : null)
                .then(data => data ? mapVPRequestObject(data) : null);

            if (vpRequest) {
                const holder = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [holder_key])
                    .then(h => h.CLValue?.asBytesArray() || null)
                    .then(h => h ? Buffer.from(h).toString('hex') : null);

                vpRequest.holder = holder;

                const status = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [status_key])
                    .then(h => h?.CLValue ? h.CLValue.asBigNumber().toNumber() : 0);

                vpRequest.status = status || 0;
            }
            return vpRequest;
        } catch (e) {
            console.error(e);
            return null;
        }
    };

    const result = await Promise.all(
        new Array(vcLength)
            .fill(0)
            .map((_, i) => readDataFn(i)));

    return result.filter(t => !!t) as VerifiablePresentationRequest[];
}

async function readSdrFromIpfs(hash: Uint8Array) {
    const cid = ipfsClient.decodeCid(hash);
    return ipfsClient.readHash(cid)
        .then(data => ({ sdr: data, ipfsHash: cid + '' }));
}

function mapVPRequestObject(data: { sdr: string, ipfsHash: string }) {
    const decodedSdr = decodeJWT(data.sdr);
    return {
        ...decodedSdr,
        ...data
    };
}