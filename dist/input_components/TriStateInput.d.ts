import * as React from 'react';
export interface TriStateInputOptions {
    value: any;
    label: string;
}
export interface TriStateInputConfig {
    label?: string;
    options: TriStateInputOptions[];
    placeholder?: string;
    class_name?: string;
    no_options_message?: string;
    searchable?: boolean;
    disabled?: boolean;
}
export interface TriStateInputProps {
    value?: string;
    config: TriStateInputConfig;
    onChange: (string: any) => void;
}
declare class TriStateInput extends React.Component<TriStateInputProps, TriStateInputConfig> {
    render(): JSX.Element;
}
export default TriStateInput;
//# sourceMappingURL=TriStateInput.d.ts.map