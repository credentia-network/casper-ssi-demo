import { MouseEventHandler } from "react";

export interface ButtonProps {
    color?: 'primary' | 'outline' | 'second';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
