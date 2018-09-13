import * as React from 'react';
export declare type InputType = "bool" | "button" | "confirm" | "date" | "grid" | "number" | "select" | "text";
export interface InputConfig {
    [key: string]: any;
    default_value: any;
    type: InputType;
    onChange: (any: any) => void;
}
export interface PromptRequest {
    inputs: InputConfig[];
    props?: object;
}
export interface PromptState {
    show?: boolean;
    modal_props?: any;
    values?: any[];
    inputs?: any[];
}
export interface ComponentObject {
    bool?: typeof React.Component;
    button?: typeof React.Component;
    date?: typeof React.Component;
    grid?: typeof React.Component;
    number?: typeof React.Component;
    select?: typeof React.Component;
    text?: typeof React.Component;
    modal?: typeof React.Component;
    confirm?: typeof React.Component;
}
export declare function InputHOC(WrappedComponent: typeof React.Component): typeof React.Component;
export declare namespace InputHOC {
    function setCustomComponents(object_with_components: ComponentObject): void;
    function generateInputs(input_configs: InputConfig[], confirmCB?: (any: any) => void): {
        getValues: () => any;
        reset: () => void;
        component: any;
    };
}
export default InputHOC;
//# sourceMappingURL=index.d.ts.map