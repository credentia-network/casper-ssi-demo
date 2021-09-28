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

                <Stepper steps={this.steps} active={this.state.step + 1}></Stepper>

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
                            <InputField label="VC ID" placeholder="DID: ex: 1234567890abcdef" className="mb-2" onChange={this.onFieldChange('id')}></InputField>
                            <InputField label="VC Description" placeholder="My contacts" className="mb-2" onChange={this.onFieldChange('description')}></InputField>
                            <InputField label="Phone 1" placeholder="+38 (067) 123 45 67" className="mb-2" onChange={this.onFieldChange('phone1')}></InputField>
                            <InputField label="Phone 2" placeholder="+38 (067) 123 45 67" className="mb-2" onChange={this.onFieldChange('phone2')}></InputField>
                            <InputField label="Telegram" placeholder="@test_user" className="mb-2" onChange={this.onFieldChange('telegram')}></InputField>
                            <InputField label="Viber" placeholder="+38 (067) 123 45 67" className="mb-2" onChange={this.onFieldChange('viber')}></InputField>
                            <InputField label="WhatsApp" placeholder="+38 (067) 123 45 67" className="mb-2" onChange={this.onFieldChange('whatsApp')}></InputField>
                            <InputField label="Linkedin" placeholder="/userlink_1" className="mb-2"  onChange={this.onFieldChange('linkedIn')}></InputField>
                            <InputField label="Email" placeholder="my@mail.com"  onChange={this.onFieldChange('email')}></InputField>
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