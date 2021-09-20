import * as React  from 'react';
import {BackButton} from '../../components/back-button/back-button';
import {Pagetitle} from '../../components/page-title/page-title';
import {Stepper} from "../stepper/stepper";
import {Button} from "../button/button";
import './create-verifier.scss'
import {useEffect, useState} from "react";

export function CreateVerifierRequest(){
    const steps = ['Choose fields', 'Send VC request'];
const [state,setState] = useState({
    btn: false,
    btntt:false
})
    const handleChange = (prop) => {
        setState({...state, [prop]: !state[prop]})
    }
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

                <Stepper steps={steps} active={1}></Stepper>
                <div>
                    <h4>Personal</h4>
                    <div>
                        {/*<button className={state.btn ? 'bgg-choose-white' : 'bgg-choose-red'} onClick={() => setState({...state, btn: !state.btn})}>aaaaaaa</button>*/}
                        <button className={state.btn ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('btn')}>VC ID</button>

                    </div>

                </div>

            </div>
        );
}
