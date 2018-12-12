import * as React from 'react';
import * as formGenerator from './formGenerator';
export declare type InputType = "bool" | "button" | "confirm" | "date" | "grid" | "number" | "multi_select" | "select" | "text" | "textarea" | "tri_state";
export interface LooseObject {
    [key: string]: any;
}
export interface InputConfig {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange?: (any: any) => void;
    props: {
        [key: string]: any;
    };
}
export interface InputConfigUpdate {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange?: (any: any) => void;
    props?: {
        [key: string]: any;
    };
}
export interface PromptRequest {
    inputs: InputConfig[];
    props?: {
        [key: string]: any;
    };
}
export interface ComponentObject {
    bool?: typeof React.Component;
    button?: typeof React.Component;
    date?: typeof React.Component;
    grid?: typeof React.Component;
    number?: typeof React.Component;
    select?: typeof React.Component;
    text?: typeof React.Component;
    textarea?: typeof React.Component;
    multi_select?: typeof React.Component;
    modal?: typeof React.Component;
    confirm?: typeof React.Component;
    tri_state?: typeof React.Component;
}
export interface PromptState {
    show?: boolean;
    modal_props?: any;
    values?: {
        [key: string]: any;
    };
    inputs?: any[];
    prompt_request: PromptRequest | null;
    tag: string | null;
}
export interface HOCProperties {
    confirm: (prompt_request: PromptRequest, confirmCB?: (LooseObject: any) => void, cancelCB?: () => void) => void;
    alert: (prompt_request: PromptRequest, confirmCB?: (LooseObject: any) => void) => void;
    cancel: () => void;
    isOpen: () => boolean;
    setTag: (tag: string) => void;
    getTag: () => string | null;
    setConfig: (input_config: InputConfig) => void;
}
export declare function InputHOC(WrappedComponent: typeof React.Component): typeof React.Component;
export declare namespace InputHOC {
    function setCustomComponents(object_with_components: ComponentObject): void;
    function generateForm(input_configs: InputConfig[], confirmCB?: (any: any) => void): formGenerator.GeneratedForm;
}
export default InputHOC;
//# sourceMappingURL=index.d.ts.map