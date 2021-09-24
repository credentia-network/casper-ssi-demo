import React from "react";
import "./key-field.scss";
import {ReactComponent as Copy} from "../../assets/images/copy.svg";
import { KeyFieldProps } from "./key-field-props";

export class KeyField extends React.Component<KeyFieldProps> {
    render() {
        return (
            <div className="d-flex key-field">
                <div className="key-field-title p-2">{this.props.name}</div>
                <div className="py-2 px-3 key-field-value">{this.props.value}</div>
                <div className="key-field-button p-2">
                    <button onClick={this.onCopyButtonClick}><Copy></Copy> Copy</button>
                </div>
            </div>
        )
    }

    private onCopyButtonClick = () => {
        navigator.clipboard.writeText(this.props.value);
    }
}
