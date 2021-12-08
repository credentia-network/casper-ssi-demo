import { Signer } from "casper-js-sdk";

export class SignerHelper {
    private constructor() {}
    
    static isSignerExists() {
        return !!window['casperlabsHelper'];
    }
    
    static signerExistsOrWanr() {
        if (!SignerHelper.isSignerExists()) {
            alert('The CasperLabs Signer chrome extension couldn\'t be detected.');
            return false;
        }
        return true;
    }

    static tryGetPublicKey(): Promise<string | null> {
        if (!SignerHelper.isSignerExists()) {
            return Promise.resolve(null);
        }

        return Signer.getActivePublicKey().catch(() => null);
    }

    static sendConnectionRequest() {
        if (!SignerHelper.signerExistsOrWanr()) {
            return;
        }

        Signer.sendConnectionRequest();
    }
}