import * as React from 'react';
import { InputFieldProps } from './input-field-props';
import { InputFieldState } from './input-field-state';
import "./input-field.scss";

export class InputField extends React.Component<InputFieldProps, InputFieldState> {
    constructor(props: InputFieldProps) {
        super(props);
        this.state = { value: props.value };
    }

    render() {
        return (
            <div className={'d-flex align-items-center input-field ' + this.props.className}>
                <div className="input-field-label w-50 p-2">
                    {this.props.label}
                </div>
                <div className="input-field-input w-50 p-2">
                    <input value={this.props.value} placeholder={this.props.placeholder} onChange={this.onInputChange} />
                </div>
            </div>
        );
    }

    private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(state => ({ ...state, value: event.target.value }));
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }
}