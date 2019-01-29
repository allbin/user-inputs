import * as React from 'react';
export interface TriStateInputConfig {
    type: "tri_state";
    key: string;
    default_value: string | number;
    label?: string;
    options: TriStateInputOption[];
    placeholder?: string;
    class_name?: string;
    no_options_message?: string;
    searchable?: boolean;
    disabled?: boolean;
    message?: string;
    /** TODO: Implement tooltip */
    tooltip?: string;
    onValueChange?: (value: string | number) => void;
}
export interface TriStateInputProps {
    value?: string;
    config: TriStateInputConfig;
    onChange: (value: string | number) => void;
}
export declare class Input extends React.Component<TriStateInputProps, TriStateInputConfig> {
    onChange(value: string | number): void;
    render(): JSX.Element;
}
export declare function validate(cfg: TriStateInputConfig, value: string | number): null | string;
export declare function validateConfig(cfg: TriStateInputConfig): null | string;
export declare function getParsedValue(cfg: TriStateInputConfig, value: string | number): string | number;
