import * as React from 'react';
import { MultiSelectOption } from '../.';
export interface MultiSelectInputConfig {
    type: "multi_select";
    key: string;
    default_value: (string | number)[];
    label?: string;
    placeholder?: string;
    options: MultiSelectOption[];
    class_name?: string;
    no_options_message?: string;
    disabled?: boolean;
    /** Is the multi_select searchable? Default true */
    searchable?: boolean;
    message?: string;
    /** TODO: Implement tooltip */
    tooltip?: string;
    onValueChange?: (value: (string | number)[]) => void;
    validationCB?: (value: (string | number)[]) => null | string;
}
export interface MultiSelectInputProps {
    value: MultiSelectOption[];
    config: MultiSelectInputConfig;
    onChange: (options: MultiSelectOption[], cb: () => void) => void;
    display_error_message: boolean;
}
export declare class Input extends React.Component<MultiSelectInputProps> {
    onChange(values: MultiSelectOption[]): void;
    render(): JSX.Element;
}
export declare function validate(cfg: MultiSelectInputConfig, value: (number | string)[]): null | string;
export declare function validateConfig(cfg: MultiSelectInputConfig): null | string;
export declare function convertInternalToExternalValue(cfg: MultiSelectInputConfig, values: MultiSelectOption[]): (string | number)[];
export declare function convertExternalToInternalValue(cfg: MultiSelectInputConfig, values: (number | string)[]): MultiSelectOption[];
