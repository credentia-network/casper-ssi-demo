import * as React from 'react';
import "./button-create-verifier.scss"
import {ButtonCreateVerifierProps} from "./button-create-verifier-props";

export class ButtonCreateVerifier extends React.Component<ButtonCreateVerifierProps> {

    render() {
        return (
                    <button className={this.props.toggle ? 'btn-choose green' : 'btn-choose white'}
                            onClick={this.props.onClick}>{this.props.title}</button>
        );
    }
}
