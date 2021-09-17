import * as React from 'react';
import { Button } from '../button/button';
import { ReceiverDidFieldProps } from './reciever-did-field-props';
import { ReceiverDidFieldState } from './reciever-did-field-state';
import "./reciever-did-field.scss";

export class ReceiverDidField extends React.Component<ReceiverDidFieldProps, ReceiverDidFieldState> {
    constructor(props: ReceiverDidFieldProps) {
        super(props);
        this.state = { did: null, valid: false };
      }

    render() {
        return (
            <div className="reciever-did-field">
                <label className="form-label">Enter reciever’s DID</label>
                
                <div className="d-flex">                    
                    <input className="form-control me-2" onChange={this.onInputChange} />

                    <Button color="second" disabled={!this.state.did} onClick={this.checkDid}>Check</Button>
                </div>
                {!this.state.valid &&
                    <div className="did-not-checked mt-2">DID is no checked</div>}

                {this.state.valid &&
                    <div className="did-valid mt-2">DID is Valid</div>}
            </div>
        );
    }

    private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(state => ({...state, did: event.target.value, valid: false}));
    }

    private checkDid = () => {
        const valid = this.state.did === '123';
        this.setState(state => ({...state, valid}));
        if (valid && this.props.onDidEnter) {
            this.props.onDidEnter(this.state.did!);
        }
    }
}