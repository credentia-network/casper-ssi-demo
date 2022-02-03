import { CasperClient, CasperServiceByJsonRPC, DeployUtil, PublicKey, RuntimeArgs, Signer } from "casper-js-sdk";
import { CONTRACT_DEMOVCREGISTRY_HASH, DEPLOY_GAS_PAYMENT, DEPLOY_GAS_PRICE, DEPLOY_TTL_MS, NETWORK, RPC_URL } from "./constants";
import { IdentityHelper } from "./helpers/identity-helper";

const casperClientRpc = new CasperServiceByJsonRPC(RPC_URL);
const casperClient = new CasperClient(RPC_URL);

async function deployKeyToCasperNet(issuerPublicKeyHex: string, targetPublicKeyHex: string, entryPoint: string, runtimeArgs: RuntimeArgs, accountPublicKey?: string) {
    const contractHashAsByteArray = Buffer.from(CONTRACT_DEMOVCREGISTRY_HASH.slice(5), "hex");
    const publicKey = await (accountPublicKey ? Promise.resolve(accountPublicKey) : Signer.getActivePublicKey()).then(pk => IdentityHelper.getIdentityKey(pk));

    const deploy = DeployUtil.makeDeploy(
        new DeployUtil.DeployParams(
            PublicKey.fromEd25519(publicKey),
            NETWORK,
            DEPLOY_GAS_PRICE,
            DEPLOY_TTL_MS
        ),
        DeployUtil.ExecutableDeployItem.newStoredContractByHash(
            contractHashAsByteArray,
            entryPoint,
            runtimeArgs
        ),
        DeployUtil.standardPayment(DEPLOY_GAS_PAYMENT)
    );

    const json = DeployUtil.deployToJson(deploy);
    const signedDeploy = await Signer.sign(json, issuerPublicKeyHex, targetPublicKeyHex);

    console.log("Signed deploy");
    console.log(signedDeploy);

    const deployObj = DeployUtil.deployFromJson(signedDeploy);

    if (deployObj) {
        const deployResult = await casperClient.putDeploy(deployObj);

        console.log("Deploy result");
        console.log(deployResult);
    }
}

export { casperClientRpc, casperClient, deployKeyToCasperNet };