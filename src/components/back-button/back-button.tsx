import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../../assets/images/arrow-left.svg';
import { BackButtonProps } from "./back-button-props";

export class BackButton extends React.Component<BackButtonProps> {
    render() {
        return (
            <Link role="button" className={'button primary button-icon static ' + (this.props.color  ?  'color-' + this.props.color : '')} to={this.props.link}>
                <ArrowLeft></ArrowLeft>
            </Link>
        )
    }
}
