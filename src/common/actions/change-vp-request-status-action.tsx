import { CLValue, RuntimeArgs, Signer } from "casper-js-sdk";
import { deployKeyToCasperNet } from "../casper-client";
import { IdentityHelper } from "../helpers/identity-helper";
import { HOLDER_REQUESTS } from "../reducers/types";
import { store } from "../store";

export function changeVpRequestStatus(ipfsHash: string, status: number) {
    return async function (dispatch) {
        const state = store.getState();
        const vp = state.holder.requests.find(t => t.ipfsHash == ipfsHash);        
        const issuerPublicKey = IdentityHelper.getPublicKeyFromDid(vp.iss)!;

        const publicKeyHex = await Signer.getActivePublicKey();
        try {
            await setStatus(publicKeyHex, issuerPublicKey, vp.index, status);
        } catch (e: any) {
            if ((e.message || e) == 'User Cancelled Signing') {
                return;
            }
            throw e;
        }

        vp.status = status;
        dispatch({ type: HOLDER_REQUESTS, payload: state.holder.requests });
    }
}

async function setStatus(senderPublicKeyHex: string, issuerPublicKey: string, index: number, newStatus: number) {
    console.log('status: ' + newStatus);
    const runtimeArgs = RuntimeArgs.fromMap({
        verifier: CLValue.byteArray(IdentityHelper.hash(issuerPublicKey)),
        index: CLValue.u64(index),
        newStatus: CLValue.u8(newStatus)
    });
    await deployKeyToCasperNet(senderPublicKeyHex, issuerPublicKey, 'changeVPRequestStatus', runtimeArgs);
}
