import { VeramoAgentManager } from "../veramo-agent-manager";


export function createVerifyRequestAction(data) {
    return async function (dispatch) {
        const sdr = await VeramoAgentManager.instance.createSdr(data);
        console.log(sdr);

        //await agentManager.
    };
}
