import { createDidKey } from "../helpers/create-did-key";
import { IdentityHelper } from "../helpers/identity-helper";
import { SIGNEDIN } from "../reducers/types";

export function signedin(publicKey: string) {
    return function (dispatch) {
        
        dispatch({
            type: SIGNEDIN,
            payload: {
                publicKey,
                accountHash: Buffer.from(IdentityHelper.hash(publicKey)).toString('hex'), //toAccountHash(publicKey),
                did: createDidKey(publicKey)
            }
        });
    }
};