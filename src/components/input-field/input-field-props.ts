export type InputFieldChangeEventHandler = (value: unknown) => void;

export interface InputFieldProps {
    label: string;
    value?: string | number;
    placeholder?: string;
    onChange?: InputFieldChangeEventHandler;
    className?: string;
    checkbox?: boolean;
    isChecked?: any;
    inputChange?: boolean
}
