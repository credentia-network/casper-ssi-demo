import * as React from 'react';
import "./holder.scss"
import { BackButton } from '../../components/back-button/back-button';
import { Pagetitle } from '../../components/page-title/page-title';
import {ButtonHolder} from "../../components/button-holder/button-holder";
import {HolderTable} from "../../components/holder-table/holder-table";


export class Holder extends React.Component {
    render() {
        return (
            <div>

                <div className="d-flex p-3">
                    <div className="me-4">
                        <BackButton link="/did-management" color="pink"></BackButton>
                    </div>
 
                    <Pagetitle title="holder" subtitle="Verifiable Credentials"></Pagetitle>
                </div>

                <h4 className="mb-4">View and share VC issued to you</h4>

                <p>In this tab you can create and sign (issue) VC documents for a specific recipient (including yourself). The issued document can be revoked and its data can be viewed.</p>

                 <div className="mb-4">
                     <div className="button-row mb-4">
                     <ButtonHolder  className="personaldata" title="Personal Data"/>
                     <ButtonHolder  className="government"  title="Government Documents"/>
                     <ButtonHolder  className="finance" title="Finance"/>
                     </div>
                     <div className="button-row">
                     <ButtonHolder  className="ehealth" title="E-Health"/>
                     <ButtonHolder  className="education" title="Education"/>
                     <ButtonHolder  className="professional_achievments" title="Professional achievements"/>
                     </div>
                 </div>
                   <h4 className="mb-4">Incoming data requests</h4>
               <div> <HolderTable/></div>
            </div>
        );
    }
}
