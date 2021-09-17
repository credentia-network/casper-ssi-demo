import React from "react";
import { ButtonProps } from "./button-props";

export class Button extends React.Component<ButtonProps> {
    render() {
        return (
            <button
                className={'button' + this.getColorClass() + this.getSizeClass() + ` ${this.props.className}`}
                disabled={this.props.disabled}
                onClick={this.props.onClick}>{this.props.children}</button>
        );
    }

    private getColorClass(): string {
        return this.props.color ? ` ${this.props.color}` : '';
    }

    private getSizeClass(): string {
        return ` button-${this.props.size || 'md'}`;
    }
}

