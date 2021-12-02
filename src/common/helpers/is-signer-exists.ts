
export function isSignerExists() {
    return !!window['casperlabsHelper'];
}

export function signerExistsOrWanr() {
    if (!isSignerExists()) {
        alert('The CasperLabs Signer chrome extension couldn\'t be detected.');
        return false;
    }
    return true;
}
