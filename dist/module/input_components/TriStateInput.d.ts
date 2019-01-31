import * as React from 'react';
import { TriStateInputOption } from '../.';
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
    validationCB?: (value: string | number) => null | string;
}
export interface TriStateInputProps {
    value: string | number;
    config: TriStateInputConfig;
    onChange: (value: string | number, cb: () => void) => void;
    display_error_message: boolean;
}
export declare class Input extends React.Component<TriStateInputProps, TriStateInputConfig> {
    onChange(value: string | number): void;
    render(): JSX.Element;
}
export declare function validate(cfg: TriStateInputConfig, value: string | number): null | string;
export declare function validateConfig(cfg: TriStateInputConfig): null | string;
export declare function convertInternalToExternalValue(cfg: TriStateInputConfig, value: string | number): string | number;
export declare function convertExternalToInternalValue(cfg: TriStateInputConfig, value: string | number): string | number;
