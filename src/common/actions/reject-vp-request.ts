import { CLValueBuilder, RuntimeArgs, Signer } from "casper-js-sdk";
import { deployKeyToCasperNet } from "../casper-client";
import { getPublicKeyFromDid } from "../helpers/create-did-key";

export async function rejectVpRequest(vpRequest: any) {
    const status = 2;
    const holderPublicKeyHex = await Signer.getActivePublicKey();
    const issuerPublicKeyHex = getPublicKeyFromDid(vpRequest.iss);
    const runtimeArgs = RuntimeArgs.fromMap({
        index: CLValueBuilder.u64(vpRequest.index),
        newStatus: CLValueBuilder.u8(status),
    });
    await deployKeyToCasperNet(holderPublicKeyHex, issuerPublicKeyHex, 'changeVPRequestStatus', runtimeArgs, issuerPublicKeyHex);
}
