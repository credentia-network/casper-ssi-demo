import * as React from 'react';
import { ChooseFields } from '../choose-fields/choose-fields';
import { SaveRequestProps } from './save-request-props';
import { ReactComponent as Copy } from "../../../../assets/images/copy.svg";
import "./save-request.scss"

export class SaveRequest extends React.Component<SaveRequestProps> {    
    render() {
        return <>
            <div className="d-flex flex-wrap">
                <div className="btbox">
                    <ChooseFields categories={this.props.categories} readonly={true} allChecked={true}></ChooseFields>
                </div>
                <div className="box-copy">
                    <h4>Request Submission Methods
                        Copy
                    </h4>
                    <button className="btn-secure-chat">Open secure chat</button>
                    <p>Send request link</p>
                    <div className="d-flex link">
                        <div className="link-value">https://www.smashingmagazine.com/2020/12/
                        </div>
                        <div>
                            <button className="copy-btn"><Copy></Copy> Copy</button>
                        </div>
                    </div>
                    <div className="qr-verifier"></div>
                </div>
            </div>
        </>
    }
}