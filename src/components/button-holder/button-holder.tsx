import * as React from 'react';
import "./button-holder.scss"
import { ButtonHolderProps} from "./button-holder-props";

export class ButtonHolder extends React.Component< ButtonHolderProps> {

    render() {
        return (
            <a className="button-for-holder " href="/" >
                <div className={this.props.className}></div>
        <div className="title">{this.props.title}</div>
            </a>
        );
    }
}
