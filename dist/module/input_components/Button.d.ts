import * as React from 'react';
export interface ButtonConfig {
    type: "button" | "confirm";
    key: string;
    label: string;
    default_value: any;
    class_name?: string;
    big?: boolean;
    /** Should the buttons background color be filled in or transparent? Default true. */
    filled?: boolean;
    disabled?: boolean;
    dark?: boolean;
    light?: boolean;
    red?: boolean;
    green?: boolean;
    teal?: boolean;
    block?: boolean;
    autofocus?: boolean;
    onClick?: () => void;
    onValueChange?: () => void;
}
export interface ButtonProps {
    config: ButtonConfig;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick: () => void;
    disabled: boolean;
}
export declare class Input extends React.Component<ButtonProps, any> {
    render(): JSX.Element;
}
export declare function validate(cfg: ButtonConfig, value: any): null | string;
export declare function validateConfig(cfg: ButtonConfig): null | string;
export declare function getParsedValue(cfg: ButtonConfig, value: any): any;
