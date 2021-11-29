import { Signer } from "casper-js-sdk";
import { createDidKey } from "../helpers/create-did-key";
import { toAccountHash } from "../helpers/to-account-hash";
import { SIGNEDIN } from "../reducers/types";

export function restoreSigninAction() {
    return function (dispatch) {
        Signer.getActivePublicKey()
            .catch(() => null)
            .then(publicKey => {
                if (publicKey) {
                    dispatch({
                        type: SIGNEDIN,
                        payload: {
                            publicKey,
                            accountHash: toAccountHash(publicKey),
                            did: createDidKey(publicKey)
                        }
                    });
                }
            })
    }
}
