import * as React  from 'react';
import {BackButton} from '../../components/back-button/back-button';
import {Pagetitle} from '../../components/page-title/page-title';
import {Stepper} from "../stepper/stepper";
import './create-verifier.scss'
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {VERIFIER} from "../../common/reducers/types";
import {getVerifier} from "../../common/reducers/verifier-reducer";

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
                        <button className={verifier.personal.vcid ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('vcid','personal')}>VC ID</button>
                        <button className={verifier.personal.vcdescription ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('vcdescription','personal')}>VC Description</button>
                        <button className={verifier.personal.phone1 ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('phone1','personal')}>Phone1</button>
                        <button className={verifier.personal.phone2 ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('phone2','personal')}>Phone2</button>
                        <button className={verifier.personal.telegram ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('telegram','personal')}>Telegram</button>
                        <button className={verifier.personal.linkedin ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('linkedin','personal')}>Linkedin</button>
                        <button className={verifier.personal.whatsup ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('whatsup','personal')}>WhatsApp</button>
                        <button className={verifier.personal.viber ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('viber','personal')}>Viber</button>
                    </div>
                    <h5 className="mb-2">Governament</h5>
                    <div className="mb-2">
                        <button className={verifier.govarnment.id ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('id', 'govarnment')}>Id</button>
                        <button className={verifier.govarnment.social ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('social', 'govarnment')}>#Social</button>

                    </div>
                    <h5 className="mb-2">Finance</h5>
                    <div className="mb-2">
                        <button className={verifier.finance.finvcid ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('finvcid', 'finance')}>VC ID</button>
                        <button className={verifier.finance.finvcdescription ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('finvcdescription', 'finance')}>VC Description</button>

                    </div >
                    <h5 className="mb-2">E-Health</h5>
                    <div className="mb-2">
                        <button className={verifier.health.vacctination ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('vacctination', 'health')}>Vaccination covid
                        </button>

                    </div>
                    <h5 className="mb-2">Education</h5>
                    <div className="mb-2">
                        <button className={verifier.education.id_diplom ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('id_diplom', 'education')}>Diplom ID</button>
                        <button className={verifier.education.speciality ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('speciality', 'education')}>Speciality</button>
                        <button className={verifier.education.academic_degree ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('academic_degree', 'education')}>Academic degree
                        </button>
                        <button className={verifier.education.date ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('date', 'education')}>Date</button>

                    </div>
                    <h5 className="mb-2">Professional</h5>
                    <div className="mb-4">
                        <button className={verifier.profesional.email ? 'bgg-choose-green' : 'bgg-choose-white'} onClick={() => handleChange('email', 'profesional')}>Email
                        </button>

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
