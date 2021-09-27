import * as React from 'react';
import { BackButton } from '../../components/back-button/back-button';
import { Button } from '../../components/button/button';
import { CategoriesBar } from '../../components/categories-bar/categories-bar';
import { DidDocumentSuccess } from '../../components/did-document-success/did-document-success';
import { InputField } from '../../components/input-field/input-field';
import { Pagetitle } from '../../components/page-title/page-title';
import { ReceiverDidField } from '../../components/reciever-did-field/reciever-did-field';
import { Stepper } from '../../components/stepper/stepper';

export class CreateDidDocument extends React.Component {
    steps = ['Choose reciever', 'Choose document type', 'Generate document', 'Check document', 'Sign a document'];

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

                <Stepper steps={this.steps} page="issuer" active={2}></Stepper>

                <ReceiverDidField></ReceiverDidField>

                <div className="d-flex mt-4">
                    <Button color="second">Close</Button>
                    <Button className="ms-3" color="primary">Select template</Button>
                </div>

                <CategoriesBar categories={[{ title: 'Personal Data', button: 'My contacts' }, { title: 'Government', button: 'Passport' }]}></CategoriesBar>

                <div>
                    <InputField label="VC ID" placeholder="DID: ex: 1234567890abcdef" className="mb-2" inputChange={true}></InputField>
                    <InputField label="VC Description" className="mb-2" inputChange={true}></InputField>
                    <InputField label="Phone 1" className="mb-2" inputChange={true}></InputField>
                    <InputField label="Phone 2" className="mb-2" inputChange={true}></InputField>
                    <InputField label="Telegram" className="mb-2" inputChange={true}></InputField>
                    <InputField label="Viber" className="mb-2" inputChange={true}></InputField>
                    <InputField label="WhatsApp" className="mb-2" inputChange={true}></InputField>
                    <InputField label="Linkedin" className="mb-2" inputChange={true}></InputField>
                    <InputField label="Email"></InputField>
                </div>

                <DidDocumentSuccess transaction="1jh2k45g12346hfjhfjljg135jgk235khgjh5"></DidDocumentSuccess>
            </div>
        );
    }
}
