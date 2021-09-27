import * as React from "react";
import {ViewDidReadDialogProps} from "./view-did-read-dialog-props";
import ReactModal from "react-modal";
import './view-did-read-dialog.scss'
import {InputField} from "../input-field/input-field";
import {Button} from "../button/button";


export class ViewDidReadDialog extends React.Component<ViewDidReadDialogProps> {
    render() {
        return (
            <ReactModal className="view-did-read-dialog d-flex flex-column justify-content-between "
                        isOpen={true}>
<h4 className="mb-3"> View DID Document
</h4>
                <div className="mb-3">
                    <h5>General</h5>
                <InputField label="DID Number" value="DID: ex: 1234567890abcdef"  className="mb-2"/>
                <InputField label="Reciever" value="DID: ex: 1234567890abcdef"  className="mb-2"/>
                <InputField label="Issued" value="17:11:02 (UTC) 11 May 2021"  className="mb-2"/>
                <InputField label="Valid until" value="Without limit"  className="mb-2"/>
                </div>

                <div className="mb-3">
                    <h5>General</h5>
                    <InputField label="Company name" value="Vareger"  className="mb-2"/>
                    <InputField label="DID document type" value="DID: ex: 1234567890abcdef"  className="mb-2"/>
                </div>

                <div className="mb-3">
                    <h5>Privat fields
                    </h5>
                    <InputField label="Privat fields" value="7 fields"  className="mb-2"/>
                </div>
                <div className="d-flex justify-content-end">
                    <Button className="me-2" onClick={this.props.onClose}>Cancel</Button>
                    <Button color="primary"onClick={this.props.onClose}>Revoke</Button>
                </div>
            </ReactModal>
        );
    }
}
