import { Signer } from "casper-js-sdk";
import { casperClientRpc } from "../casper-client";
import { CONTRACT_DEMOVCREGISTRY_HASH } from "../constants";
import { IdentityHelper } from "../helpers/identity-helper";
import ipfsClient from "../ipfs-client";
import { HOLDER_REQUESTS } from "../reducers/types";
import { decodeJWT } from 'did-jwt';

export function readHolderVPRequestsAction() {
    return async function (dispatch) {
        const payload = await loadLinkedVpRequests();
        dispatch({
            type: HOLDER_REQUESTS,
            payload
        });
    }
}

async function loadLinkedVpRequests() {
    const stateRootHash = await (casperClientRpc as any).getStateRootHash();
    const pubKey = await Signer.getActivePublicKey();
    const hash = IdentityHelper.hash(pubKey, 'hex');

    const vc_length_key = `VPRequestLink_length_${hash}`;
    const vcLength: number = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_length_key])
        .then(data => data.CLValue?.value().toNumber() || 0)
        .catch((e) => {
            console.log(e);
            return 0;
        });

    if (vcLength) {
        return Promise.all(new Array(vcLength).fill(0).map(async (_, index) => {
            const vc_link_key = `VPRequestLink_${hash}_${index}`;

            try {
                const link = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_link_key])
                    .then(data => data ? data.CLValue?.value() : null);

                if (link) {
                    const ipfsHash_key = `${link}ipfsHash`;
                    const status_key = `${link}status`;
                    const ipfsHash = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [ipfsHash_key])
                        .then(data => data ? data.CLValue?.value() : null);
                    const status = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [status_key])
                        .then(data => data ? +data.CLValue?.value()! : null);

                    if (ipfsHash) {
                        return { ...mapVPRequestObject(await readSdrFromIpfs(ipfsHash) as any), index, status };
                    }
                    return null;
                }
            } catch (e) {
                console.error(e);
                return null;
            }
        }))
            .then(data => data.filter(t => !!t));
    }

    return [];
}

async function readSdrFromIpfs(hash: Uint8Array) {
    const cid = ipfsClient.decodeCid(hash);
    return ipfsClient.readHash(cid)
        .then(data => ({ sdr: data, ipfsHash: cid + '' }));
}

function mapVPRequestObject(data: { sdr: string, ipfsHash: string }) {
    const decodedSdr = decodeJWT(data.sdr);
    return {
        ...decodedSdr.payload,
        ipfsHash: data.ipfsHash
    };
}