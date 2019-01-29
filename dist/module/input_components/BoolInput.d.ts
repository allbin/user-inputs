import * as React from 'react';
export interface BoolInputConfig {
    type: "bool";
    key: string;
    default_value: boolean;
    label?: string;
    class_name?: string;
    message?: string;
    /** TODO: Implement tooltip */
    tooltip?: string;
    onValueChange?: (value: boolean) => void;
}
export interface BoolInputProps {
    type: "bool";
    key: string;
    value: boolean;
    config: BoolInputConfig;
    onChange: (checked: boolean) => void;
}
export declare class Input extends React.Component<BoolInputProps, any> {
    onChange(value: boolean): void;
    render(): JSX.Element;
}
export declare function validate(cfg: BoolInputConfig, value: boolean): null | string;
export declare function validateConfig(cfg: BoolInputConfig): null | string;
export declare function getParsedValue(cfg: BoolInputConfig, value: boolean): boolean;
