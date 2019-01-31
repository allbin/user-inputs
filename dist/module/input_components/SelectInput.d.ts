import * as React from 'react';
import { SelectOption } from '../.';
export interface SelectInputConfig {
    type: "select";
    key: string;
    default_value: string | number;
    label?: string;
    options: SelectOption[];
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
export interface SelectInputProps {
    value: SelectOption;
    config: SelectInputConfig;
    onChange: (value: SelectOption, cb: () => void) => void;
    display_error_message: boolean;
}
export declare class Input extends React.Component<SelectInputProps> {
    onChange(value: SelectOption): void;
    render(): JSX.Element;
}
export declare function validate(cfg: SelectInputConfig, value: string | number): string | null;
export declare function validateConfig(cfg: SelectInputConfig): null | string;
export declare function convertInternalToExternalValue(cfg: SelectInputConfig, value: SelectOption): string | number;
export declare function convertExternalToInternalValue(cfg: SelectInputConfig, value: string | number): SelectOption;
