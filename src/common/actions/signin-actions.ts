import { Signer } from "casper-js-sdk";
import { SIGNIN } from "../reducers/types"

export function signin() {
    return function (dispatch) {
        window.addEventListener('signer:unlocked', receiveMessage, { once: true });

        function receiveMessage(event: any) {
            if (event.detail.activeKey) {
                dispatch({ type: SIGNIN, payload: { accountKey: event.detail.activeKey } });
            }
        }

        Signer.sendConnectionRequest();
    }
}
