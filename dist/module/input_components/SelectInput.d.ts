import * as React from 'react';
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
    onChange?: (value: string | number) => void;
}
export interface SelectInputProps {
    value?: SelectOption;
    config: SelectInputConfig;
    onChange: (value: SelectOption) => void;
}
declare class SelectInput extends React.Component<SelectInputProps> {
    onChange(value: SelectOption): void;
    render(): JSX.Element;
}
export default SelectInput;
