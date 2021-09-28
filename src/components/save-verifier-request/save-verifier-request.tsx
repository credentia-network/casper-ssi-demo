import * as React  from 'react';
import {useSelector} from "react-redux";
import {getVerifier} from "../../common/reducers/verifier-reducer";
import {useState} from "react";
import {Stepper} from "../stepper/stepper";
import {BackButton} from "../back-button/back-button";
import {Pagetitle} from "../page-title/page-title";
import {ButtonCreateVerifier} from "../button-create-verifier/button-create-verifier";
import "./save-verifier-request.scss"
import {ReactComponent as Copy} from "../../assets/images/copy.svg";



export function SaveVerifierRequest (){
    const steps = ['Choose fields', 'Send VC request'];
    const [verdata,setVerdata]= useState({
        personal: false,
        govarnment: false,
        finance: false,
        health: false,
        education: false,
        profesional: false,
     })
    const verifier = useSelector(state => getVerifier(state));
    for (const globalkey in verifier){
        for (const key in verifier[globalkey]){
            if (verifier[globalkey][key] && !verdata[globalkey]){
                setVerdata({...verdata, [globalkey]: true})
            }
        }
    }
        return (
            <div>
                <div className="d-flex p-3">

                    <div className="me-4">
                        <BackButton link="/did-management" color="purpure"></BackButton>
                    </div>

                    <Pagetitle title="verifier" subtitle="Verifiable Credentials"></Pagetitle>

                </div>

                <h4 className="mb-4">Request and verify third party VC</h4>

                <div>
                    <p>In this tab you can create and sign (issue) VC documents for a specific recipient (including
                        yourself). The issued document can be revoked and its data can be viewed.</p>
                </div>

                <Stepper steps={steps} page="verifier" active={2}></Stepper>

                <div className="d-flex flex-wrap">

            <div className="btbox">

                {verdata.personal ? <h5 className="mb-2">Personal</h5> : null}

                <div className="mb-2">
                {verifier.personal.vcid ?
                    <ButtonCreateVerifier toggle={true} title="VC ID" /> : null}
                {verifier.personal.vcdescription ?
                    <ButtonCreateVerifier toggle={true} title="VC Description"/> : null}
                {verifier.personal.phone1 ?
                    <ButtonCreateVerifier toggle={true} title="Phone1"/> : null}
                {verifier.personal.phone2 ?
                    <ButtonCreateVerifier toggle={true} title="Phone2"/> : null}
                {verifier.personal.telegram ?
                    <ButtonCreateVerifier toggle={true} title="Telegram"/> : null}
                {verifier.personal.linkedin ?
                    <ButtonCreateVerifier toggle={true} title="Linkedin"/> : null}
                {verifier.personal.whatsup ?
                    <ButtonCreateVerifier toggle={true}title="WhatsApp" /> : null}
                {verifier.personal.viber ?
                    <ButtonCreateVerifier toggle={true} title="Viber"/> : null}
                </div>

                {verdata.govarnment ?  <h5 className="mb-2">Governament</h5>: null}

                <div className="mb-2">
                    {verifier.govarnment.id ?
                        <ButtonCreateVerifier toggle={true} title="Id"/> : null}
                    {verifier.govarnment.social ?
                        <ButtonCreateVerifier toggle={true} title="#Social"/> : null}
                </div>

                {verdata.finance ?  <h5 className="mb-2">Finance</h5>: null}

                <div className="mb-2">
                    {verifier.finance.finvcid ?
                        <ButtonCreateVerifier toggle={true} title="VC ID"/> : null}
                    {verifier.finance.finvcdescription ?
                        <ButtonCreateVerifier toggle={true} title="VC Description"/> : null}
                </div>

                {verdata.health ?  <h5 className="mb-2">E-Health</h5>: null}

                <div className="mb-2">
                    {verifier.health.vacctination ?
                        <ButtonCreateVerifier toggle={true} title="Vaccination covid"/> : null}
                </div>

                {verdata.education ?  <h5 className="mb-2">Education</h5>: null}

                <div className="mb-2">
                    {verifier.education.id_diplom ?
                        <ButtonCreateVerifier toggle={true} title="Diplom ID"/>  : null}
                    {verifier.education.speciality ?
                        <ButtonCreateVerifier toggle={true} title="Speciality"/> : null}
                    {verifier.education.academic_degree ?
                        <ButtonCreateVerifier toggle={true} title="Academic degree"/>  : null}
                    {verifier.education.date ?
                        <ButtonCreateVerifier toggle={true} title="Date"/> : null}
                </div>

                {verdata.profesional ?  <h5 className="mb-2">Professional</h5>: null}

                <div className="mb-4">
                    {verifier.profesional.email ?
                        <ButtonCreateVerifier toggle={true} title="Email"/>: null}
                </div >

            </div>
                    <div className="box-copy">

                        <h4>Request Submission Methods
                            Copy
                        </h4>

                        <button className="btn-secure-chat">Open secure chat</button>

                        <p>Send request link</p>

                        <div className="d-flex link">
                            <div className="link-value">https://www.smashingmagazine.com/2020/12/
                            </div>
                            <div>
                                <button className="copy-btn"><Copy></Copy> Copy</button>
                            </div>
                        </div>

                        <div className="qr-verifier"></div>
                    </div>
                    <div>
                        <button className="btn-close mb-2">Close</button>
                        <button className="btn-create">Save</button>
                    </div>
                </div>

            </div>
        );


}
