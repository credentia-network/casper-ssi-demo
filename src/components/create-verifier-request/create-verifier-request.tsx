import * as React  from 'react';
import {BackButton} from '../../components/back-button/back-button';
import {Pagetitle} from '../../components/page-title/page-title';
import {Stepper} from "../stepper/stepper";
import './create-verifier.scss'
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {VERIFIER} from "../../common/reducers/types";
import {getVerifier} from "../../common/reducers/verifier-reducer";
import {ButtonCreateVerifier} from "../button-create-verifier/button-create-verifier";

export function CreateVerifierRequest(){

    const dispatch = useDispatch()

    const steps = ['Choose fields', 'Send VC request'];

    const verifier = useSelector(state => getVerifier(state));

    const handleChange = (prop,key) => {
        dispatch({
            type: VERIFIER,
                data: {...verifier, [key]: {...verifier[key], [prop]: !verifier[key][prop] } }
        });
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
                    <h5 className="mb-2">Personal</h5>
                    <div className="mb-2 d-flex w-50 flex-lg-wrap">

                        <ButtonCreateVerifier toggle={verifier.personal.vcid } title="VC ID"
                                              onClick={() => handleChange('vcid','personal')}/>
                        <ButtonCreateVerifier toggle={verifier.personal.vcdescription } title="VC Description"
                                              onClick={() => handleChange('vcdescription','personal')}/>
                        <ButtonCreateVerifier toggle={verifier.personal.phone1 } title="Phone1"
                                              onClick={() => handleChange('phone1','personal')}/>
                        <ButtonCreateVerifier toggle={verifier.personal.phone2 } title="Phone2"
                                              onClick={() => handleChange('phone2','personal')}/>
                        <ButtonCreateVerifier toggle={verifier.personal.telegram } title="Telegram"
                                              onClick={() => handleChange('telegram','personal')}/>
                        <ButtonCreateVerifier toggle={verifier.personal.linkedin } title="Linkedin"
                                              onClick={() => handleChange('linkedin','personal')}/>
                        <ButtonCreateVerifier toggle={verifier.personal.whatsup } title="WhatsApp"
                                              onClick={() => handleChange('whatsup','personal')}/>
                        <ButtonCreateVerifier toggle={verifier.personal.viber } title="Viber"
                                              onClick={() => handleChange('viber','personal')}/>
                    </div>

                    <h5 className="mb-2">Governament</h5>

                    <div className="mb-2">

                        <ButtonCreateVerifier toggle={verifier.govarnment.id} title="Id"
                                              onClick={() => handleChange('id', 'govarnment')}/>
                        <ButtonCreateVerifier toggle={verifier.govarnment.social } title="#Social"
                                              onClick={() => handleChange('social', 'govarnment')}/>

                    </div>

                    <h5 className="mb-2">Finance</h5>

                    <div className="mb-2">

                        <ButtonCreateVerifier toggle={verifier.finance.finvcid } title="VC ID"
                                              onClick={() => handleChange('finvcid', 'finance')}/>
                        <ButtonCreateVerifier toggle={verifier.finance.finvcdescription } title="VC Description"
                                              onClick={() => handleChange('finvcdescription', 'finance')}/>

                    </div >

                    <h5 className="mb-2">E-Health</h5>

                    <div className="mb-2">

                        <ButtonCreateVerifier toggle={verifier.health.vacctination } title="Vaccination covid"
                                              onClick={() => handleChange('vacctination', 'health')}/>

                    </div>

                    <h5 className="mb-2">Education</h5>

                    <div className="mb-2">

                        <ButtonCreateVerifier toggle={verifier.education.id_diplom } title="Diplom ID"
                                              onClick={() => handleChange('id_diplom', 'education')}/>
                        <ButtonCreateVerifier toggle={verifier.education.speciality } title="Speciality"
                                              onClick={() => handleChange('speciality', 'education')}/>
                        <ButtonCreateVerifier toggle={verifier.education.academic_degree } title="Academic degree"
                                              onClick={() => handleChange('academic_degree', 'education')}/>
                        <ButtonCreateVerifier toggle={verifier.education.date } title="Date"
                                              onClick={() => handleChange('date', 'education')}/>

                    </div>

                    <h5 className="mb-2">Professional</h5>

                    <div className="mb-4">

                        <ButtonCreateVerifier toggle={verifier.profesional.email } title="Email"
                                              onClick={() => handleChange('email', 'profesional')}/>

                    </div>


                </div>
                <div>
                    <button className="btn-close mb-2">Close</button>
                    <Link to='/save-verifier' >
                        <button className="btn-create">Create</button>
                    </Link>
                </div>
            </div>
        );
}
