import { Signer } from "casper-js-sdk";
import { SIGNIN } from "../reducers/types";

export function signin() {
    return function (dispatch) {
        Signer.sendConnectionRequest();
        dispatch({
            type: SIGNIN
        });
    }
}
