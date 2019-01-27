import * as React from 'react';
export interface ButtonConfig {
    type: "button" | "confirm";
    key: string;
    class_name?: string;
    default_value: any;
    label: string;
    disabled?: boolean;
    onClick?: () => void;
    onChange?: () => void;
}
export interface ButtonProps {
    config: ButtonConfig;
    dark?: boolean;
    light?: boolean;
    red?: boolean;
    green?: boolean;
    teal?: boolean;
    disabled?: boolean;
    big?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    block?: boolean;
    filled?: boolean;
    onClick: () => void;
    autofocus?: boolean;
}
export default class Button extends React.Component<ButtonProps, any> {
    render(): JSX.Element;
}
