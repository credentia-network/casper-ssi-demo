import * as React from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from '../../components/back-button/back-button';
import { Button } from '../../components/button/button';
import { CategoriesBar } from '../../components/categories-bar/categories-bar';
import { DidDocumentSuccess } from '../../components/did-document-success/did-document-success';
import { InputField } from '../../components/input-field/input-field';
import { Pagetitle } from '../../components/page-title/page-title';
import { ReceiverDidField } from '../../components/reciever-did-field/reciever-did-field';
import { Stepper } from '../../components/stepper/stepper';

export class CreateDidDocument extends React.Component {
    state = {
        step: 0,
        did: null,
        category: null,
        data: null
    };

    steps = ['Choose reciever', 'Choose document type', 'Generate document', 'Check document', 'Sign a document'];

    categories = [
        { title: 'Personal Data', button: 'My contacts' },
        { title: 'Government', button: 'Passport' },
        { title: 'Finance', button: 'Bank statement' },
        { title: 'E-health', button: 'Covid passport' },
        { title: 'Education', button: 'Diploma' },
        { title: 'Professional achievements', button: 'Recomendations' }
    ];

    render() {
        return (
            <div>
                <div className="d-flex pt-3 px-3">
                    <div className="me-4">
                        <BackButton link="/did-management"></BackButton>
                    </div>

                    <Pagetitle title="issuer" subtitle="Verifiable Credentials"></Pagetitle>
                </div>

                <h5 className="my-4">Create DID Document</h5>

                <Stepper steps={this.steps} page="issuer" active={this.state.step + 1}></Stepper>

                {this.state.step <= 1 &&
                    <ReceiverDidField onDidEnter={this.onDidEnter}></ReceiverDidField>}

                {this.state.step <= 1 &&
                    <div className="d-flex mt-4">
                        <Link to="/did-management">
                            <Button color="second">Close</Button></Link>
                        {this.state.did &&
                            <Button className="ms-3" color="primary" onClick={this.onSelectTemplateButtonClick}>Select template</Button>}
                    </div>}

                {(this.state.step === 2 || this.state.step === 3) &&
                    <CategoriesBar categories={this.categories} onSelectCategory={this.onSelectCategory}></CategoriesBar>}

                {this.state.step === 3 &&
                    <>
                        <div className="mt-4 w-50">
                            <InputField label="VC ID" placeholder="DID: ex: 1234567890abcdef" className="mb-2" inputChange={true} onChange={this.onFieldChange('id')}></InputField>
                            <InputField label="VC Description" placeholder="My contacts" className="mb-2" inputChange={true} onChange={this.onFieldChange('description')}></InputField>
                            {this.state.category === 0 &&
                                <>
                                    <InputField label="Phone 1" placeholder="+38 (067) 123 45 67" className="mb-2" inputChange={true} onChange={this.onFieldChange('phone1')}></InputField>
                                    <InputField label="Phone 2" placeholder="+38 (067) 123 45 67" className="mb-2" inputChange={true} onChange={this.onFieldChange('phone2')}></InputField>
                                    <InputField label="Telegram" placeholder="@test_user" className="mb-2" inputChange={true} onChange={this.onFieldChange('telegram')}></InputField>
                                    <InputField label="Viber" placeholder="+38 (067) 123 45 67" className="mb-2" inputChange={true} onChange={this.onFieldChange('viber')}></InputField>
                                    <InputField label="WhatsApp" placeholder="+38 (067) 123 45 67" className="mb-2" inputChange={true} onChange={this.onFieldChange('whatsApp')}></InputField>
                                    <InputField label="Linkedin" placeholder="/userlink_1" className="mb-2" inputChange={true} onChange={this.onFieldChange('linkedIn')}></InputField>
                                    <InputField label="Email" placeholder="my@mail.com" inputChange={true} onChange={this.onFieldChange('email')}></InputField>
                                </>}
                            {this.state.category === 1 &&
                                <>
                                    <InputField label="Passport ID" placeholder="TQJF07879871113" className="mb-2" inputChange={true} onChange={this.onFieldChange('passport')}></InputField>
                                    <InputField label="Nationality" placeholder="USA" className="mb-2" inputChange={true} onChange={this.onFieldChange('nationality')}></InputField>
                                    <InputField label="Surname" placeholder="Smith" className="mb-2" inputChange={true} onChange={this.onFieldChange('surname')}></InputField>
                                    <InputField label="Given names" placeholder="Ivan" className="mb-2" inputChange={true} onChange={this.onFieldChange('givenName')}></InputField>
                                    <InputField label="Sex" placeholder="M" className="mb-2" inputChange={true} onChange={this.onFieldChange('sex')}></InputField>
                                    <InputField label="Date of birth" placeholder="01 Jan 1970" className="mb-2" inputChange={true} onChange={this.onFieldChange('birthDate')}></InputField>
                                    <InputField label="Place of birth" placeholder="Zhmerinka, USA" className="mb-2" inputChange={true} onChange={this.onFieldChange('birthPlace')}></InputField>
                                    <InputField label="Issued On" placeholder="01 Jan 2013" className="mb-2" inputChange={true} onChange={this.onFieldChange('issued')}></InputField>
                                    <InputField label="Expiered On" placeholder="01 Jan 2023" className="mb-2" inputChange={true} onChange={this.onFieldChange('expiered')}></InputField>
                                    <InputField label="Photo" placeholder="https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu" className="mb-2" inputChange={true} onChange={this.onFieldChange('photo')}></InputField>
                                </>}
                            {this.state.category === 5 &&
                                <>
                                    <InputField label="Position" placeholder="Sales Manager" className="mb-2" inputChange={true} onChange={this.onFieldChange('position')}></InputField>
                                    <InputField label="Start of cooperation" placeholder="11 May 2019" className="mb-2" inputChange={true} onChange={this.onFieldChange('cooperationStartDate')}></InputField>
                                    <InputField label="End of cooperation" placeholder="11 May 2020" className="mb-2" inputChange={true} onChange={this.onFieldChange('cooperationEndDate')}></InputField>
                                    <InputField label="Additional description" placeholder="Good boy!" className="mb-2" inputChange={true} onChange={this.onFieldChange('additionalDescription')}></InputField>
                                </>}
                            {this.state.category === 3 &&
                                <>
                                    <InputField label="Covid Passport ID" placeholder="HK871987981LKS" className="mb-2" inputChange={true} onChange={this.onFieldChange('covidPassport')}></InputField>
                                    <InputField label="Date of vaccination" placeholder="11 May 2021" className="mb-2" inputChange={true} onChange={this.onFieldChange('vaccination')}></InputField>
                                    <InputField label="Number of stages" placeholder="2" className="mb-2" inputChange={true} onChange={this.onFieldChange('stages')}></InputField>
                                    <InputField label="Vaccine name" placeholder="Moderna" className="mb-2" inputChange={true} onChange={this.onFieldChange('vaccine')}></InputField>
                                    <InputField label="Manufacturer" placeholder="Moderna, Inc" className="mb-2" inputChange={true} onChange={this.onFieldChange('manufacturer')}></InputField>
                                </>}
                            {this.state.category === 2 &&
                                <>
                                    <InputField label="For (date)" placeholder="1 Jan 2019" className="mb-2" inputChange={true} onChange={this.onFieldChange('for')}></InputField>
                                    <InputField label="To (date)" placeholder="31 Dec 2019" className="mb-2" inputChange={true} onChange={this.onFieldChange('to')}></InputField>
                                    <InputField label="Opening balance" placeholder="2146" className="mb-2" inputChange={true} onChange={this.onFieldChange('balance')}></InputField>
                                    <InputField label="Withdrawals" placeholder="6451" className="mb-2" inputChange={true} onChange={this.onFieldChange('withdrawals')}></InputField>
                                    <InputField label="Deposits" placeholder="3414" className="mb-2" inputChange={true} onChange={this.onFieldChange('deposits')}></InputField>
                                    <InputField label="Closing balance to date" placeholder="7871" className="mb-2" inputChange={true} onChange={this.onFieldChange('closingBalance')}></InputField>
                                    <InputField label="Currency" placeholder="USD" className="mb-2" inputChange={true} onChange={this.onFieldChange('currency')}></InputField>
                                </>}
                            {this.state.category === 4 &&
                                <>
                                    <InputField label="Diploma ID" placeholder="СН 787187982" className="mb-2" inputChange={true} onChange={this.onFieldChange('diploma')}></InputField>
                                    <InputField label="Specialty" placeholder="Applied math" className="mb-2" inputChange={true} onChange={this.onFieldChange('specialty')}></InputField>
                                    <InputField label="Academic degree" placeholder="Ph.D." className="mb-2" inputChange={true} onChange={this.onFieldChange('degree')}></InputField>
                                    <InputField label="Date" placeholder="11 May 2016" className="mb-2" inputChange={true} onChange={this.onFieldChange('graduationDate')}></InputField>
                                </>}
                        </div>
                        <div className="d-flex mt-4">
                            <Link to="/did-management">
                                <Button color="second">Close</Button></Link>
                            <Button className="ms-3" color="primary" onClick={this.onSignButtonClick}>Sign</Button>
                        </div>
                    </>}

                {this.state.step === 4 &&
                    <DidDocumentSuccess transaction="1jh2k45g12346hfjhfjljg135jgk235khgjh5"></DidDocumentSuccess>}
            </div>
        );
    }

    private onDidEnter = (did: string | null) => {
        this.setState(state => ({ ...state, did, step: !!did ? 1 : 0 }));
    }

    private onSelectTemplateButtonClick = () => {
        this.setState(state => ({ ...state, step: 2 }));
    }

    private onSelectCategory = (index: number) => {
        this.setState(state => ({ ...state, category: index, step: 3 }));
    }

    private onFieldChange(fieldName: string) {
        return (value: unknown) => {
            const data = this.state.data || {};
            this.setState(state => ({ ...state, data: { ...data, [fieldName]: value || null } }));
        };
    }

    private onSignButtonClick = () => {
        this.setState(state => ({ ...state, step: 4 }));
    }
}
