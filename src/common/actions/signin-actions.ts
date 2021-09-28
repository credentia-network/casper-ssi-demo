import { PublicKey, Signer } from "casper-js-sdk";
import { SIGNIN } from "../reducers/types";
import { VeramoManager } from "../veramo-manager";

export function signin() {
    return function (dispatch) {
        window.addEventListener('signer:unlocked', receiveMessage, { once: true });

        async function receiveMessage(event: any) {
            if (event.detail.activeKey) {
                const did = await registerDid(event.detail.activeKey);
                dispatch({
                    type: SIGNIN,
                    payload: {
                        publicKey: event.detail.activeKey,
                        accountHash: toAccountHash(event.detail.activeKey),
                        did
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

    async function registerDid(publicKey: string): Promise<string> {
        const did = VeramoManager.instance.createDid(publicKey);
        let result = await VeramoManager.instance.resolveDid(did);
        if (!result) {
            result = await VeramoManager.instance.registerDid(did, publicKey);
        }
        return did;
    }
}
