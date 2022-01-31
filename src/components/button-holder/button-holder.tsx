import * as React from 'react';
import "./button-holder.scss"
import { ButtonHolderProps } from "./button-holder-props";

export class ButtonHolder extends React.Component<ButtonHolderProps> {

    render() {
        return (
            <button className="button-for-holder" onClick={this.onClickButton} >
                <div className={this.props.className}></div>
                <div className="title">{this.props.title}</div>
            </button>
        );
    }

    private onClickButton = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.name);
        }
    }
}
