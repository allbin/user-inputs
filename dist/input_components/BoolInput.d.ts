import * as React from 'react';
export interface BoolInputConfig {
    label: string;
    class_name?: string;
}
export interface BoolInputProps {
    value: boolean;
    config: BoolInputConfig;
    onChange: (boolean: any) => void;
}
declare class BoolInput extends React.Component<BoolInputProps, any> {
    container: typeof React.Component;
    constructor(props: any);
    render(): JSX.Element;
}
export default BoolInput;
//# sourceMappingURL=BoolInput.d.ts.map