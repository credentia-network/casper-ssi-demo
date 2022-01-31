import { CLValue, RuntimeArgs, Signer } from "casper-js-sdk";
import dayjs from "dayjs";
import MerkleTree from "merkle-tools";
import { deployKeyToCasperNet } from "../casper-client";
import { IdentityHelper } from "../helpers/identity-helper";
import ipfsClient from "../ipfs-client";
import { VERIFIER_VC } from "../reducers/types";
import VeramoManager from "../veramo-manager";


export async function createVcAction(targetDid: string, data: Array<{ [key: string]: string }>, credentialType: string, validDate?: string | null) {

    const ipfsHash = await createVC(targetDid, data, credentialType, validDate);

    return function (dispatch) {
        dispatch({ type: VERIFIER_VC, payload: { ipfsHash } });


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

async function createVC(targetDid: string, data: Array<{ [key: string]: string }>, credentialType: string, validDate?: string | null): Promise<string> {
    const targetPublicKeyHex = IdentityHelper.getPublicKeyFromDid(targetDid)!;
    const publicKeyHex = await Signer.getActivePublicKey();

    console.log('Data');
    console.log(data);

    const identifier = await VeramoManager.agent.didManagerGetOrCreate();

    const jsonLd = getJsonLd(targetDid, data, credentialType, identifier.did, validDate);
    console.log('Json LD');
    console.log(jsonLd);

    const vc = await VeramoManager.agent.createVerifiableCredential({ credential: jsonLd, proofFormat: 'jwt' });
    console.log('Verifiable Credential');
    console.log(vc);

    const ipfsHash = await ipfsClient.add(vc);
    console.log('ipfs');
    console.log(ipfsHash);

    const merkleRoot = getMerkleRoot(data);
    console.log('Merkle Root');
    console.log(merkleRoot.toString());

    await writeVC(publicKeyHex, targetPublicKeyHex, ipfsHash, merkleRoot);

    return ipfsClient.decodeCid(ipfsHash) + '';
}

function getJsonLd(targetDid: string, data: Array<{ [key: string]: string }>, credentialType: string, issuerDid: string, expirationDate?: string | null) {
    const credentialSubject: any = { "id": targetDid };
    data.forEach(t => {
        const entries = Object.entries(t)[0];
        credentialSubject[entries[0]] = entries[1];
    })
    return {
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        type: [
            "VerifiableCredential",
            credentialType
        ],
        issuer: {
            id: issuerDid
        },
        issuanceDate: new Date().toISOString(),
        expirationDate: expirationDate ? dayjs(expirationDate, 'YYYY-MM-DD').toISOString() : undefined,
        credentialSubject
        // "proof": {
        //     "type": "RsaSignature2018",
        //     "created": "2017-06-18T21:19:10Z",
        //     "proofPurpose": "assertionMethod",
        //     "verificationMethod": "https://example.edu/issuers/keys/1",
        //     "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk- BuQy72IFLOqV0G_zS245 - kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"
        // }
    };
}

function getMerkleRoot(data: Array<{ [key: string]: string }>): Uint8Array {
    const tree = new MerkleTree({ hashType: 'sha256' });
    data.forEach(t => {
        const entry = Object.entries(t)[0];
        tree.addLeaf(entry[1], true);
    });
    tree.makeTree();
    const root = tree.getMerkleRoot();
    if (!root) {
        throw new Error(`Merkle tree is not ready; [Data: ${JSON.stringify(data)}]`);
    }
    return root;
}

async function writeVC(issuerPublicKeyHex: string, targetPublicKeyHex: string, ipfsHash: Uint8Array, merkleRoot: Uint8Array) {
    const schemaHash = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); //TODO: Put here JSON schema hash
    const revocationFlag = true;

    const runtimeArgs = RuntimeArgs.fromMap({
        merkleRoot: CLValue.byteArray(merkleRoot),
        ipfsHash: CLValue.byteArray(ipfsHash),
        schemaHash: CLValue.byteArray(schemaHash),
        holder: CLValue.byteArray(IdentityHelper.hash(targetPublicKeyHex)),
        revocationFlag: CLValue.bool(revocationFlag),
    });

    await deployKeyToCasperNet(issuerPublicKeyHex, targetPublicKeyHex, 'issueDemoVC', runtimeArgs);
}
