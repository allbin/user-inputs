import * as React from 'react';
export interface MultiSelectOptions {
    value: any;
    label: string;
}
export interface MultiSelectInputConfig {
    label?: string;
    placeholder?: string;
    options: MultiSelectOptions[];
    class_name?: string;
    no_options_message?: string;
    disabled?: boolean;
    searchable?: boolean;
}
export interface MultiSelectInputProps {
    value: string;
    config: MultiSelectInputConfig;
    onChange: (string: any) => void;
}
declare class MultiSelectInput extends React.Component<MultiSelectInputProps, MultiSelectInputConfig> {
    render(): JSX.Element;
}
export default MultiSelectInput;
//# sourceMappingURL=MultiSelectInput.d.ts.map