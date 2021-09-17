import React from "react";
import { LabelProps } from "./label-props";
import "./label.scss";

export class Label extends React.Component<LabelProps> {
    render() {
        return (
            <div className={'app-label label-' + this.props.color}>{this.props.name}</div>
        )
    }
}
