import * as React from 'react';
export interface TextareaInputConfig {
    type: "textarea";
    key: string;
    default_value: string;
    label?: string;
    rows?: number;
    placeholder?: string;
    class_name?: string;
    trim?: boolean;
    message?: string;
    /** TODO: Implement tooltip */
    tooltip?: string;
    onValueChange?: (value: string) => void;
    onValidate?: (value: string) => null | string;
}
export interface TextareaInputProps {
    value: string;
    config: TextareaInputConfig;
    onChange: (value: string) => void;
    autofocus?: boolean;
}
export declare class Input extends React.Component<TextareaInputProps, TextareaInputConfig> {
    onChange(value: string): void;
    render(): JSX.Element;
}
export declare function validate(cfg: TextareaInputConfig, value: string): null | string;
export declare function validateConfig(cfg: TextareaInputConfig): null | string;
export declare function getParsedValue(cfg: TextareaInputConfig, value: string): string | number;
