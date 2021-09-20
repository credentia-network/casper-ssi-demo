import * as React from 'react';
import "./verifier.scss"
import {BackButton} from '../../components/back-button/back-button';
import {Pagetitle} from '../../components/page-title/page-title';
import {VerefierTable} from "../../components/verifier-table/verefier-table";
import {CreateVerifierRequest} from "../../components/create-verifier-request/create-verifier-request";
import {Link} from "react-router-dom";

export class Verifier extends React.Component {
    render() {
        return (
            <div>

                <div className="d-flex p-3">
                    <div className="me-4">
                        <BackButton link="/did-management" color="purple"></BackButton>
                    </div>

                    <Pagetitle title="verifier" subtitle="Verifiable Credentials"></Pagetitle>
                </div>

                <h4 className="mb-4">Request and verify third party VC</h4>
                <div>
                    <p>In this tab you can create and sign (issue) VC documents for a specific recipient (including
                        yourself). The issued document can be revoked and its data can be viewed.</p>
                    <div className="conte">
                        <Link to="/create-verifier"> <button className="button primary button-sm w-auto px-3 text-nowrap" onClick={this.createRequest}>Create VC request</button></Link>
                       <button className="button primary button-sm w-auto px-3 text-nowrap">Create VC request</button>
                    </div>
                    <div>
                        <VerefierTable/>
                    </div>
                </div>

                {/*<div><CreateVerifierRequest /></div>*/}
            </div>
        );
    }
    createRequest(){
    }
}
