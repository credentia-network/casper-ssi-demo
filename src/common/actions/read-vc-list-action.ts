import { Signer } from "casper-js-sdk";
import { casperClientRpc } from "../casper-client";
import { CONTRACT_DEMOVCREGISTRY_HASH } from "../constants";
import { VerifiableCredentials } from "../contracts/verifiable-credentials";
import { IdentityHelper } from "../helpers/identity-helper";
import ipfsClient from "../ipfs-client";
import { VC_LIST } from "../reducers/types";


export function readVCListAction() {
    return async function (dispatch) {
        const payload = await readVCRegistry();
        dispatch({
            type: VC_LIST,
            payload
        });
    }
}

async function readVCRegistry(): Promise<VerifiableCredentials[]> {
    const stateRootHash = await (casperClientRpc as any).getStateRootHash();
    const pubKey = await Signer.getActivePublicKey();
    const issuerHash = Buffer.from(IdentityHelper.hash(pubKey)).toString('hex');

    const length_key = `VC_length_${issuerHash}`;
    const vcLength: number = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [length_key])
        .then(data => {
            return data.CLValue?.value().toNumber() || 0;
        })
        .catch(() => 0);

    if (!vcLength) {
        return [];
    }

    return Promise.all(new Array(vcLength).fill(0).map(async (_, index) => {
        const vc_ipfsHash_key = `VC_${issuerHash}_${index}_ipfsHash`;
        const vc_holder_key = `VC_${issuerHash}_${index}_holder`;

        const holderArr = await casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_holder_key])
            .then(data => data.CLValue!.value());

        const holderPubKey = Buffer.from(holderArr).toString('hex');

        return readVCByKey(vc_ipfsHash_key, holderPubKey, stateRootHash);

        // return casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [vc_ipfsHash_key])
        //     .then(data => data ? data.CLValue?.asBytesArray() : null)
        //     .then(hash => hash ? this.readIpfsData(hash) : null)
        //     .then(data => data ? this.mapVcObject(data, holderPubKey) : null)
        //     .catch(e => {
        //         console.error(e);
        //         return null;
        //     });
    })).then(data => data.filter(t => !!t) as VerifiableCredentials[]);
}

async function readVCByKey(key: string, holderPubKey: string, stateRootHash: any): Promise<VerifiableCredentials | null> {
    return casperClientRpc.getBlockState(stateRootHash, CONTRACT_DEMOVCREGISTRY_HASH, [key])
        .then(data => data ? data.CLValue?.value() : null)
        .then(hash => hash ? readIpfsData(hash) : null)
        .then(data => data ? mapVcObject(data, holderPubKey) : null)
        .catch(e => {
            console.error(e);
            return null;
        });
}

async function readIpfsData(hash: Uint8Array) {
    if (!hash) {
        return null;
    }
    const cid = ipfsClient.decodeCid(hash);
    return ipfsClient.readHash(cid)
        .then(data => ({ ...data, ipfsHash: cid + '' }));
}

function mapVcObject(data: any, holderPubKey: string | null): VerifiableCredentials | null {
    if (!data) {
        return null;
    }
    const now = new Date().valueOf();
    return {
        active: !data.expirationDate || new Date(data.expirationDate).valueOf() > now,
        did: holderPubKey ? IdentityHelper.createDidKey(holderPubKey) : '',
        createDate: data.issuanceDate,
        deactivateDate: data.expirationDate || null,
        vcId: data.ipfsHash,
        ...data
    };
}