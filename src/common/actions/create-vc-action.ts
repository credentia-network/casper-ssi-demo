import { CLValue, DeployUtil, PublicKey, RuntimeArgs } from "casper-js-sdk";
import { CONTRACT_DID_HASH, DEPLOY_GAS_PAYMENT, DEPLOY_GAS_PRICE, DEPLOY_TTL_MS, NETWORK } from "../constants";
import ipfsClient from "../ipfs-client";
import { VERIFIER_VC } from "../reducers/types";
import { store } from "../store";
import { VeramoAgentManager } from "../veramo-agent-manager";

export function createVcAction(data: any) {
    return async function (dispatch) {
        const state = store.getState();

        const agentManager = new VeramoAgentManager(state.signin.publicKey);

        const vc = await agentManager.createVC(data);
        
        const { cid } = await ipfsClient.add(JSON.stringify(vc));

        dispatch({type: VERIFIER_VC, payload: { ipfsHash: cid }});


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
