import * as React from 'react';
export interface TextareaInputConfig {
    label?: string;
    rows?: number;
    placeholder?: string;
    class_name?: string;
}
export interface TextareaInputProps {
    value: string;
    config: TextareaInputConfig;
    onChange: (string: any) => void;
}
declare class TextareaInput extends React.Component<TextareaInputProps, TextareaInputConfig> {
    container: typeof React.Component;
    constructor(props: any);
    render(): JSX.Element;
}
export default TextareaInput;
//# sourceMappingURL=TextareaInput.d.ts.map