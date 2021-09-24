import { PublicKey, Signer } from "casper-js-sdk";
import { SIGNIN } from "../reducers/types";

export function signin() {
    return function (dispatch) {
        window.addEventListener('signer:unlocked', receiveMessage, { once: true });

        function receiveMessage(event: any) {
            if (event.detail.activeKey) {
                dispatch({
                    type: SIGNIN,
                    payload: {
                        publicKey: event.detail.activeKey,
                        accountHash: toAccountHash(event.detail.activeKey),
                        did: `did:casper:${event.detail.activeKey}`
                    }
                });
            }
        }

        Signer.sendConnectionRequest();
    }

    function toAccountHash(publicKeyHex: string): string {
        const bytes = PublicKey.fromHex(publicKeyHex).toAccountHash();
        return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
    }
}
