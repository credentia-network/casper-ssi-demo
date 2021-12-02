import { Signer } from "casper-js-sdk";
import { signerExistsOrWanr } from "../helpers/is-signer-exists";
import { SIGNIN } from "../reducers/types";

export function signin() {
    return function (dispatch) {
        if (!signerExistsOrWanr()) {
            return;
        }

        Signer.sendConnectionRequest();
        dispatch({
            type: SIGNIN
        });
    }
}
