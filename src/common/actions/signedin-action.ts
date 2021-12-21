import { createDidKey } from "../helpers/create-did-key";
import { IdentityHelper } from "../helpers/identity-helper";
import { toAccountHash } from "../helpers/to-account-hash";
import { SIGNEDIN } from "../reducers/types";
import { SsiManager } from "../ssi-manager";

export function signedin(publicKey: string) {
    return function (dispatch) {
        SsiManager.create(publicKey);
        
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