import * as React from 'react';
import ReactModal from 'react-modal';
import { Button } from '../button/button';
import { CreateDidDialogProps } from './create-did-dialog-props';
import "./create-did-dialog.scss";

export class CreateDidDialog extends React.Component<CreateDidDialogProps> {
    render() {
        return (
            <ReactModal className="create-did-dialog d-flex flex-column justify-content-between"
                isOpen={true} >

                <h5>Create DID</h5>

                <div>
                    <div>
                        <label className="form-label d-block">DID Type</label>
                        <select className="w-100 form-select"></select>
                    </div>

                    <div>
                        <label className="form-label d-block">Description</label>
                        <textarea className="w-100 form-control"></textarea>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <Button onClick={this.onCancelButtonClick}>Cancel</Button>
                    <Button color="primary" className="ms-2" onClick={this.onSubmitButtonClick}>Submit</Button>
                </div>
            </ReactModal>
        );
    }

    private onCancelButtonClick = () => {
        this.emitCloseEvent();
    }

    private onSubmitButtonClick = () => {
        this.emitCloseEvent();
    }

    private emitCloseEvent(data?: any) {
        if (this.props.onClose) {
            this.props.onClose(data);
        }
    }
}