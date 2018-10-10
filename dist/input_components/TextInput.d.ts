import * as React from 'react';
export interface TextInputConfig {
    label?: string;
    class_name?: string;
}
export interface TextInputProps {
    value: string;
    config: TextInputConfig;
    onChange: (string: any) => void;
    autofocus?: boolean;
}
declare class TextInput extends React.Component<TextInputProps, TextInputConfig> {
    container: typeof React.Component;
    constructor(props: any);
    render(): JSX.Element;
}
export default TextInput;
//# sourceMappingURL=TextInput.d.ts.map