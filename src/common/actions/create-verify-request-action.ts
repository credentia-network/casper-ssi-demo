import { IdentityHelper } from "../helpers/identity-helper";
import { SsiManager } from "../ssi-manager";

export interface CreateVerifyRequestAction {
    holderDid: string;
    fields: string[];
}

export function createVerifyRequestAction(data: CreateVerifyRequestAction) {
    return async function (dispatch) {
        const holderPubKey = IdentityHelper.getPublicKeyFromDid(data.holderDid);
        await SsiManager.instance.createVPRequest(data.fields, holderPubKey!);
        // console.log(sdr);

        //await agentManager.
    };
}
