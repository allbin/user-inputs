import * as React from 'react';
export interface BoolInputConfig {
    type: "bool";
    key: string;
    default_value: string;
    label?: string;
    class_name?: string;
    onChange?: (value: boolean) => void;
}
export interface BoolInputProps {
    type: "bool";
    key: string;
    value: boolean;
    config: BoolInputConfig;
    onChange: (checked: boolean) => void;
}
declare class BoolInput extends React.Component<BoolInputProps, any> {
    onChange(value: boolean): void;
    render(): JSX.Element;
}
export default BoolInput;
