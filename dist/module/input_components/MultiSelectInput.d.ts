import * as React from 'react';
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
}
export interface MultiSelectInputProps {
    value: MultiSelectOption;
    config: MultiSelectInputConfig;
    onChange: (options: MultiSelectOption[]) => void;
}
export declare class Input extends React.Component<MultiSelectInputProps> {
    onChange(values: MultiSelectOption[]): void;
    render(): JSX.Element;
}
export declare function validate(cfg: MultiSelectInputConfig, value: (number | string)[]): null | string;
export declare function validateConfig(cfg: MultiSelectInputConfig): null | string;
export declare function getParsedValue(cfg: MultiSelectInputConfig, values: MultiSelectOption[]): (string | number)[];
