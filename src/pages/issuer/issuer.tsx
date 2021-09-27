import React from "react";
import { BackButton } from "../../components/back-button/back-button";
import { IssuerTable } from "../../components/issuer-table/issuer-table";
import { Pagetitle } from "../../components/page-title/page-title";
import {RevokeDialog} from "../../components/revoke-dialog/revoke-dialog";
import {RevokeSuccessDialog} from "../../components/revoke-success-dialog/revoke-success-dialog";

export class Issuer extends React.Component {

       state = {
            createDialogOpenned: false,
            didCreated: false,

    }
    render() {
        return (
            <div>
                <div className="d-flex p-3">
                    <div className="me-4">
                        <BackButton link="/did-management"></BackButton>
                    </div>

                    <Pagetitle title="issuer" subtitle="Verifiable Credentials"></Pagetitle>
                </div>

                <h4 className="mb-4">Creation and management of VC issued by you</h4>

                <div className="d-flex mb-4">
                    <p>In this tab you can create and sign (issue) VC documents for a specific recipient (including yourself).<br />The issued document can be revoked and its data can be viewed.</p>                    
                    <div className="spacer"></div>
                    <div>
                        <button className="button primary button-sm w-auto px-3 text-nowrap">Create Issuer VC</button>
                    </div>
                </div>

                <div>
                    <IssuerTable onClick={this.onViewDidDocument}></IssuerTable>
                </div>
                {!!this.state.createDialogOpenned &&
                <RevokeDialog onClose={this.onViewDidDialogClose}></RevokeDialog>
                }

                {!!this.state.didCreated &&
                <RevokeSuccessDialog onClose={this.onDidCreatedSuccessClose}></RevokeSuccessDialog>
                }
            </div>

        )
    }
    private onViewDidDialogClose = (data: any) => {
        this.setState((state: any) => ({ ...state, createDialogOpenned: false, didCreated: true }));
    }
    private onViewDidDocument = () => {
        this.setState((state: any) => ({ ...state, createDialogOpenned: true }));
    }
    private onDidCreatedSuccessClose = () => {
        this.setState((state: any) => ({ ...state, createDialogOpenned: false, didCreated: false }));
    }
}
