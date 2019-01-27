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
    searchable?: boolean;
    onChange?: (value: (string | number)[]) => void;
}
export interface MultiSelectInputProps {
    value: MultiSelectOption;
    config: MultiSelectInputConfig;
    onChange: (options: MultiSelectOption[]) => void;
}
declare class MultiSelectInput extends React.Component<MultiSelectInputProps> {
    onChange(values: MultiSelectOption[]): void;
    render(): JSX.Element;
}
export default MultiSelectInput;
