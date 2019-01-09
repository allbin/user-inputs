import * as React from 'react';
export interface SelectInputOptions {
    value: any;
    label: string;
}
export interface SelectInputConfig {
    label?: string;
    options: SelectInputOptions[];
    placeholder?: string;
    class_name?: string;
    no_options_message?: string;
    searchable?: boolean;
    disabled?: boolean;
}
export interface SelectInputProps {
    value?: string;
    config: SelectInputConfig;
    onChange: (string: any) => void;
}
declare class SelectInput extends React.Component<SelectInputProps, SelectInputConfig> {
    render(): JSX.Element;
}
export default SelectInput;
//# sourceMappingURL=SelectInput.d.ts.map