import React from "react";
import { store } from "../../common/store";
import { CreateDidDialog } from "../../components/create-did-dialog/create-did-dialog";
import { DidCreatedSuccessDialog } from "../../components/did-created-success-dialog/did-created-success-dialog";
import { DidManagementTable } from "../../components/did-management-table/did-management-table";
import { KeyField } from "../../components/key-field/key-field";
import { PillTab } from "../../components/pill-tab/pill-tab";
import "./did-management.scss";

export class DidManagement extends React.Component<any, any> {
    unsubscribe;

    constructor(props) {
        super(props);
        const storeState = store.getState();
        console.log(storeState);
        this.state = {
            createDialogOpenned: false, 
            didCreated: false,
            ...storeState.signin
        }
    }

    render() {
        return (
            <div>
                <div className="d-flex pt-3">
                    <PillTab title="issuer" description="Verifiable Credentials" link="issuer" color="blue"></PillTab>
                    <PillTab title="holder" description="Verifiable Credentials" link="sssas" color="pink"></PillTab>
                    <PillTab title="verifier" description="Verifiable Credentials" link="sssas" color="purpure"></PillTab>
                </div>

                <h4 className="my-4">Account</h4>

                <KeyField name="Public Key" value={this.state.publicKey}></KeyField>
                <KeyField name="Account Hash" value={this.state.accountHash}></KeyField>

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
