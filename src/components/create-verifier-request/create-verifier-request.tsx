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
    vcid: false,
    vcdescription:false,
    phone1:false,
    phone2:false,
    telegram:false,
    linkedin:false,
    whatsup:false,
    viber:false,
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
                    <h5 className="mb-4">Personal</h5>
                    <div className="mb-4">
                        {/*<button className={state.btn ? 'bgg-choose-white' : 'bgg-choose-red'} onClick={() => setState({...state, btn: !state.btn})}>aaaaaaa</button>*/}
                        <button className={state.vcid ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('vcid')}>VC ID</button>
                        <button className={state.vcdescription ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('vcdescription')}>VC Description</button>
                        <button className={state.phone1 ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('phone1')}>Phone1</button>
                        <button className={state.phone2 ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('phone2')}>Phone2</button>
                        <button className={state.telegram ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('telegram')}>Telegram</button>
                        <button className={state.linkedin ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('linkedin')}>Linkedin</button>
                        <button className={state.whatsup ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('whatsup')}>WhatsApp</button>
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>
                    </div>
                    <h5 className="mb-4">Governament</h5>
                    <div className="mb-4">
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>

                    </div>
                    <h5 className="mb-4">Finance</h5>
                    <div className="mb-4">
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>

                    </div >
                    <h5 className="mb-4">E-Health</h5>
                    <div className="mb-4">
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>

                    </div>
                    <h5 className="mb-4">Education</h5>
                    <div className="mb-4">
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>

                    </div>
                    <h5 className="mb-4">Professional</h5>
                    <div className="mb-4">
                        <button className={state.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber')}>Viber</button>

                    </div>

                </div>

            </div>
        );
}
