import * as React  from 'react';
import {BackButton} from '../../components/back-button/back-button';
import {Pagetitle} from '../../components/page-title/page-title';
import {Stepper} from "../stepper/stepper";
import {Button} from "../button/button";
import './create-verifier.scss'
import {useEffect, useState} from "react";

export class CreateVerifierRequest extends React.Component {
    steps = ['Choose fields', 'Send VC request'];
    choosen =[]
    toggle = false
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
                </div>

                <Stepper steps={this.steps} active={1}></Stepper>
                <div>
                    <h4>Personal</h4>
                    <div>
                        {/*<button className="bgg-choose" onClick={this.getdd}>aaaaaaa</button>*/}

                    </div>

                </div>

            </div>
        );
    }

}
