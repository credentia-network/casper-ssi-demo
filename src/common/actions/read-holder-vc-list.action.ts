import { Signer } from "casper-js-sdk";
import { casperClientRpc } from "../casper-client";
import { CONTRACT_DEMOVCREGISTRY_HASH } from "../constants";
import { IdentityHelper } from "../helpers/identity-helper";
import ipfsClient from "../ipfs-client";
import { HOLDER_VC } from "../reducers/types";
import VeramoManager from "../veramo-manager";

export function readHolderVCListAction() {
    return async function (dispatch) {
        const payload = await loadLinkedVcRegistry();
        dispatch({
            type: HOLDER_VC,
            payload
        });
    }
}

async function loadLinkedVcRegistry() {
    const stateRootHash = await (casperClientRpc as any).getStateRootHash();
    const pubKey = await Signer.getActivePublicKey();
    const hash = IdentityHelper.hash(pubKey, 'hex');

    const vc_length_key = `VCLink_length_${hash}`;
    const vcLength: number = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_length_key])
        .then(data => data.CLValue?.value().toNumber() || 0)
        .catch(() => 0);

    if (vcLength) {
        return Promise.all(new Array(vcLength).fill(0).map((_, index) => {
            const vc_link_key = `VCLink_${hash}_${index}`;

            return casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_link_key])
                .then(data => data ? data.CLValue?.value() : null)
                .catch(() => null)
                .then(link => {
                    if (link) {
                        link = `${link}ipfsHash`;
                        return casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [link]);
                    }
                    return null;
                })
                .then(data => data ? data.CLValue?.value() : null)
                .then(hash => hash ? readIpfsData(hash) : null)
                .then(vc => {
                    if (vc)
                        return VeramoManager.agent.dataStoreSaveVerifiableCredential({ verifiableCredential: vc }).then(() => vc);
                    return vc;
                });
        }))
            .then(data => data.filter(t => !!t));
    }

    return [];
}

async function readIpfsData(hash: Uint8Array) {
    if (!hash) {
        return null;
    }
    const cid = ipfsClient.decodeCid(hash);
    return ipfsClient.readHash(cid)
        .then(data => ({ ...data, ipfsHash: cid + '' }));
}