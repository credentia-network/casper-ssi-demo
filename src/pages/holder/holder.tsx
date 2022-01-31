import * as React from 'react';
import "./holder.scss"
import { BackButton } from '../../components/back-button/back-button';
import { Pagetitle } from '../../components/page-title/page-title';
import { ButtonHolder } from "../../components/button-holder/button-holder";
import { HolderTable } from "../../components/holder-table/holder-table";
import { ViewDidDialog } from "../../components/view-did-dialog/view-did-dialog";
import { ViewDidReadDialog } from "../../components/view-did-read-dialog/view-did-read-dialog";


export class Holder extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            viewDialogOpenned: false,
            viewReadDialogOpenned: false,
            viewVcCredentialType: ''
        }
    }
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
                        <ButtonHolder className="personaldata" title="Personal Data" name="PersonalDataCredential" onClick={this.onVcCategoryClick} />
                        <ButtonHolder className="government" title="Government Documents" name="PassportCredential" onClick={this.onVcCategoryClick} />
                        <ButtonHolder className="finance" title="Finance" name="BankCredential" onClick={this.onVcCategoryClick} />
                    </div>
                    <div className="button-row">
                        <ButtonHolder className="ehealth" title="E-Health" name="EhealthCredential" onClick={this.onVcCategoryClick} />
                        <ButtonHolder className="education" title="Education" name="EducationCredential" onClick={this.onVcCategoryClick} />
                        <ButtonHolder className="professional_achievments" title="Professional achievements" name="ProfessionalCredential" onClick={this.onVcCategoryClick} />
                    </div>
                </div>
                
                <h4 className="mb-4">Incoming data requests</h4>
                
                <div>
                    <HolderTable />
                </div>
                
                {/* <div className="mb-4">
                    <button className="button primary button-md" onClick={this.onViewDidDocument}>View DID checkbox</button>
                    <button className="button primary button-md ms-2" onClick={this.onViewDidReadDocument}>View DID </button>
                </div> */}
                {!!this.state.viewDialogOpenned &&
                    <ViewDidDialog vpRequest={null} onClose={this.onViewDidDialogClose}></ViewDidDialog>
                }
                {!!this.state.viewVcCredentialType &&
                    <ViewDidReadDialog credentialType={this.state.viewVcCredentialType} onClose={this.onViewDidReadDocumentClose} />
                }
            </div>
        );
    }
    private onViewDidDialogClose = (data: any) => {
        this.setState((state: any) => ({ ...state, viewDialogOpenned: false }));
    }
    private onViewDidDocument = () => {
        this.setState((state: any) => ({ ...state, viewDialogOpenned: true }));
    }
    private onViewDidReadDocumentClose = () => {
        this.setState((state: any) => ({ ...state, viewVcCredentialType: '' }));
    }
    private onViewDidReadDocument = () => {
        this.setState((state: any) => ({ ...state, viewReadDialogOpenned: true }));
    }

    private onVcCategoryClick = (viewVcCredentialType: string) => {
        this.setState({
            ...this.state,
            viewVcCredentialType
        });
    }
};
