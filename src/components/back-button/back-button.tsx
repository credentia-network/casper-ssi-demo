import React from "react";
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-left.svg';
import { BackButtonProps } from "./back-button-props";

export class BackButton extends React.Component<BackButtonProps> {
    render() {
        return (
            <a role="button" className="button primary button-icon static" href={this.props.link}>
                <ArrowLeft></ArrowLeft>
            </a>
        )
    }
}
