import React from "react";
import "./view-did-field.scss";
import {ViewDidFieldProps} from "./view-did-field-props";

export class ViewDidField extends React.Component<ViewDidFieldProps> {
    render() {
        return (
            <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="view-box d-flex justify-content-end">
                    <div className="view-title">{this.props.title}
                    </div>
                    <div className="view-value ">{this.props.value}
                    </div>
                </div>
                <div className="form-check view-switch ">
                    <input className="view-check-input" type="checkbox"  onChange={this.props.onChange} checked={this.props.isChecked}/>
                </div>
            </div>
        )
    }
}
