import * as React from 'react';
import { DidDocumentSuccessProps } from './did-document-success-props';
import "./did-document-success.scss";
import { ReactComponent as Check } from '../../assets/images/check.svg';

export class DidDocumentSuccess extends React.Component<DidDocumentSuccessProps> {
    render() {
        return (
            <div className="d-flex did-document-success">
                <div className="check">
                    <Check></Check>
                </div>
                <div className="message-block ms-3">
                    <h5>The document has been published successfully!</h5>
                    <p className="transaction-id-label">TransactionID:</p>
                    <p className="transaction-id">{this.props.transaction}</p>
                </div>
            </div>
        );
    }
}
