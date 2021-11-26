import { createDidKey } from "../helpers/create-did-key";
import { toAccountHash } from "../helpers/to-account-hash";
import { SIGNEDIN } from "../reducers/types";

export function signedin(publicKey: string) {
    return function (dispatch) {
        dispatch({
            type: SIGNEDIN,
            payload: {
                publicKey,
                accountHash: toAccountHash(publicKey),
                did: createDidKey(publicKey)
            }
        });
    }
};