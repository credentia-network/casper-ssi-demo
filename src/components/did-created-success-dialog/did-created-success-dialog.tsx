import * as React from 'react';
import ReactModal from 'react-modal';
import { DidCreatedSuccessDialogProps } from './did-created-success-dialog-props';
import { ReactComponent as Check } from '../../assets/images/check.svg';
import { Button } from '../button/button';
import "./did-created-success-dialog.scss";

export class DidCreatedSuccessDialog extends React.Component<DidCreatedSuccessDialogProps> {
    render() {
        return (
            <ReactModal className="did-created-success-dialog d-flex flex-column justify-content-center align-items-center"
                isOpen={true} >

                <div className="check">
                    <Check></Check>
                </div>

                <h5>DID Successfully created</h5>

                <div>
                    <p className="mb-1 fw-bold text-center">TransactionID:</p>
                    <p className="m-0 text-center">1jh2k45g12346hfjhfjljg135jgk235khgjh5</p>
                </div>

                <Button color="primary" className="mt-4" onClick={this.onCloseButtonClick}>OK</Button>

            </ReactModal>
        );
    }

    private onCloseButtonClick = () => {
        this.emitCloseEvent();
    }

    private emitCloseEvent(data?: any) {
        if (this.props.onClose) {
            this.props.onClose(data);
        }
    }
}