import { CLValue, RuntimeArgs, Signer } from "casper-js-sdk";
import { deployKeyToCasperNet } from "../casper-client";
import { IdentityHelper } from "../helpers/identity-helper";
import ipfsClient from "../ipfs-client";
import { CREATE_VP_REQUEST } from "../reducers/types";
import VeramoManager from "../veramo-manager";

export interface CreateVerifyRequestAction {
    holderDid: string;
    fields: string[];
}

export async function createVerifyRequestAction(data: CreateVerifyRequestAction) {
    const holderPubKey = IdentityHelper.getPublicKeyFromDid(data.holderDid);
    await createVPRequest(data.fields, holderPubKey!);

    return function (dispatch) {
        dispatch({type: CREATE_VP_REQUEST});
    };
}

async function createVPRequest(fields: string[], holderPaublicKeyHex: string) {
    const publicKeyHex = await Signer.getActivePublicKey();
    const identifier = await VeramoManager.agent.didManagerGetOrCreate();

    const sdr = await VeramoManager.agent.createSelectiveDisclosureRequest({
        data: {
            issuer: identifier.did,
            claims: fields.map(t => ({ claimType: t }))
        }
    });

    console.log('SDR hash');
    console.log(sdr);

    const ipfsHash = await ipfsClient.add(sdr);
    console.log('ipfs');
    console.log(ipfsHash + '');

    await writeVPRequest(publicKeyHex, ipfsHash, holderPaublicKeyHex);
}

async function writeVPRequest(senderPublicKeyHex: string, ipfsHash: Uint8Array, holderPublicKeyHex: string) {
    const ipfsHashResponce = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const runtimeArgs = RuntimeArgs.fromMap({
        ipfsHash: CLValue.byteArray(ipfsHash),
        ipfsHashResponce: CLValue.byteArray(ipfsHashResponce),
        holder: CLValue.byteArray(IdentityHelper.hash(holderPublicKeyHex))
    });
    await deployKeyToCasperNet(senderPublicKeyHex, holderPublicKeyHex, 'sendVPRequest', runtimeArgs);
}
