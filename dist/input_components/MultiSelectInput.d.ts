import * as React from 'react';
export interface MultiSelectOptions {
    value: any;
    label: string;
}
export interface MultiSelectInputConfig {
    label?: string;
    placeholder?: string;
    options: MultiSelectOptions[];
    class_name: string;
}
export interface MultiSelectInputProps {
    value: string;
    config: MultiSelectInputConfig;
    onChange: (string: any) => void;
}
declare class MultiSelectInput extends React.Component<MultiSelectInputProps, MultiSelectInputConfig> {
    container: typeof React.Component;
    constructor(props: any);
    render(): JSX.Element;
}
export default MultiSelectInput;
//# sourceMappingURL=MultiSelectInput.d.ts.map