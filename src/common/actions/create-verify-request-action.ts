import { store } from "../store";
import { VeramoAgentManager } from "../veramo-agent-manager";


export function createVerifyRequestAction(data) {
    return async function (dispatch) {
        const state = store.getState();

        const agentManager = new VeramoAgentManager(state.signin.publicKey);
        const sdr = await agentManager.createSdr(data);
        console.log(sdr);

        //await agentManager.
    };
}
