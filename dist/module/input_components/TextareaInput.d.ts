import * as React from 'react';
export interface TextareaInputConfig {
    type: "textarea";
    key: string;
    default_value: string;
    label?: string;
    rows?: number;
    placeholder?: string;
    class_name?: string;
    trim?: boolean;
    onChange?: (value: string) => void;
}
export interface TextareaInputProps {
    value: string;
    config: TextareaInputConfig;
    onChange: (value: string) => void;
    autofocus?: boolean;
}
declare class TextareaInput extends React.Component<TextareaInputProps, TextareaInputConfig> {
    onChange(value: string): void;
    render(): JSX.Element;
}
export default TextareaInput;
