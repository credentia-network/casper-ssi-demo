import React from "react";
import { CreateDidDialog } from "../../components/create-did-dialog/create-did-dialog";
import { DidCreatedSuccessDialog } from "../../components/did-created-success-dialog/did-created-success-dialog";
import { DidManagementTable } from "../../components/did-management-table/did-management-table";
import { KeyField } from "../../components/key-field/key-field";
import { PillTab } from "../../components/pill-tab/pill-tab";
import "./did-management.scss";

export class DidManagement extends React.Component<any, any> {
    state = { createDialogOpenned: false, didCreated: false };

    render() {
        return (
            <div>
                <div className="d-flex pt-3">
                    <PillTab title="issuer" description="Verifiable Credentials" link="issuer" color="blue"></PillTab>
                    <PillTab title="holder" description="Verifiable Credentials" link="sssas" color="pink"></PillTab>
                    <PillTab title="verifier" description="Verifiable Credentials" link="sssas" color="purpure"></PillTab>
                </div>

                <h4 className="my-4">Account</h4>

                <KeyField name="Public Key" value="01eecc0fa33486a6ffcd9bed49119f5d91551ffbf09e23ebb12b79f9a05e2e0214"></KeyField>
                <KeyField name="Account Hash" value="b93b845b496b3711c0c4fe06bd11b88f2419f973abc9b16b9c9e6ef84e94f726"></KeyField>

                <h4 className="my-4">Managing your DID identifiers</h4>

                <div className="mb-4">
                    <button className="button primary button-md" onClick={this.onCreateButtonClick}>Create DID</button>
                </div>

                <DidManagementTable></DidManagementTable>

                {!!this.state.createDialogOpenned &&
                    <CreateDidDialog onClose={this.onCreateDidDialogClose}></CreateDidDialog>
                }

                {!!this.state.didCreated &&
                    <DidCreatedSuccessDialog onClose={this.onDidCreatedSuccessClose}></DidCreatedSuccessDialog>
                }

            </div>
        )
    }

    private onCreateButtonClick = () => {
        this.setState((state: any) => ({ ...state, createDialogOpenned: true }));
    }

    private onCreateDidDialogClose = (data: any) => {
        this.setState((state: any) => ({ ...state, createDialogOpenned: false, didCreated: true }));
    }

    private onDidCreatedSuccessClose = () => {
        this.setState((state: any) => ({ ...state, createDialogOpenned: false, didCreated: false }));
    }
}
