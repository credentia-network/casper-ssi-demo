import { createDidKey } from "../helpers/create-did-key";
import { toAccountHash } from "../helpers/to-account-hash";
import { SIGNEDIN } from "../reducers/types";
import { VeramoAgentManager } from "../veramo-agent-manager";

export function signedin(publicKey: string) {
    return function (dispatch) {
        VeramoAgentManager.create(publicKey);
        
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