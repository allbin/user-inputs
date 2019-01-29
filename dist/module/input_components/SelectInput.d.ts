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
    onValidate?: (value: string | number) => null | string;
}
export interface SelectInputProps {
    value: SelectOption;
    config: SelectInputConfig;
    onChange: (value: SelectOption) => void;
}
export declare class Input extends React.Component<SelectInputProps> {
    onChange(value: SelectOption): void;
    render(): JSX.Element;
}
export declare function validate(cfg: SelectInputConfig, value: string | number): string | null;
export declare function validateConfig(cfg: SelectInputConfig): null | string;
export declare function getParsedValue(cfg: SelectInputConfig, value: SelectOption): string | number;
