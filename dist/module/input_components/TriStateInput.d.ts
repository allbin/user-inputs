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
    onChange?: (value: string | number) => void;
}
export interface TriStateInputProps {
    value?: string;
    config: TriStateInputConfig;
    onChange: (value: string | number) => void;
}
declare class TriStateInput extends React.Component<TriStateInputProps, TriStateInputConfig> {
    onChange(value: string | number): void;
    render(): JSX.Element;
}
export default TriStateInput;
