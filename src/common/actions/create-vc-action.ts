import { getPublicKeyFromDid } from "../helpers/create-did-key";
import { VERIFIER_VC } from "../reducers/types";
import { VeramoAgentManager } from "../veramo-agent-manager";

export function createVcAction(targeDid: string, data: Array<{[key: string]: string}>) {
    return async function (dispatch) {
        const targetPublicKeyHex = getPublicKeyFromDid(targeDid);
        const ipfsHash = await VeramoAgentManager.instance.createVC(targetPublicKeyHex, data);
                
        dispatch({type: VERIFIER_VC, payload: { ipfsHash }});


        // await agentManager.agent.didManagerAddKey({
        //     did: state.signin.did,
        //     key: { kid: key, publicKeyHex: value },
        //     options: {
        //         expire: new Date('2021-12-01').valueOf()
        //     }
        // });
        
        // await agentManager.agent.didManagerGet({ did: targetDid });

        // const r = await agentManager.registerDid(state.signin.did, state.signin.publicKey);
        // const jsonLd = await agentManager.buildJsonLd(data, state.signin.did);

        // // const jsonLd = getJsonLd(data, state.signin.did);

        // const deploy = createDeploy(state.signin.publicKey, jsonLd);
        // const deployJson = DeployUtil.deployToJson(deploy);
        // Signer.sign(deployJson, state.signin.publicKey, targetDid)
        //     .then(signedData => {
        //         const ci = new CredentialIssuer();
        //         return ci.createVerifiableCredential({ credential: signedData } as any, null as any);
        //     }).then(vc => {
        //         console.log(vc);
        //     });
    }
}
