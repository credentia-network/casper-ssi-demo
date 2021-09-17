import React from "react";
import { BackButton } from "../../components/back-button/back-button";
import { IssuerTable } from "../../components/issuer-table/issuer-table";
import { Pagetitle } from "../../components/page-title/page-title";

export class Issuer extends React.Component {
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
                    <IssuerTable></IssuerTable>
                </div>
            </div>
        )
    }
}
