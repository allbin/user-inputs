declare module "*.svg" {
    const content: any;
    export default content;
}
declare module "quagga" {}

type InputType = "bool" | "button" | "confirm" | "date" | "grid" | "number" | "multi_select" | "select" | "text" | "textarea" | "tri_state";
interface LooseObject {
    [key: string]: any;
}
interface SelectionsOptions {
    value: string|number;
    label: string;
}
interface InputConfig {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange?: (value: any) => void;
    props: {
        [key: string]: any;
    };
    options: SelectionsOptions[];
}
interface InputConfig2 {
    default_value: any;
    type: InputType;
    key: string;
    onChange?: (value: any) => void;
    props?: {
        [key: string]: any;
    };
    options?: SelectionsOptions[];
}

interface ComponentObject {
    [key: string]: React.ComponentClass<any> | undefined;
    bool?: React.ComponentClass<any>;
    button?: React.ComponentClass<any>;
    date?: React.ComponentClass<any>;
    grid?: React.ComponentClass<any>;
    number?: React.ComponentClass<any>;
    select?: React.ComponentClass<any>;
    text?: React.ComponentClass<any>;
    textarea?: React.ComponentClass<any>;
    multi_select?: React.ComponentClass<any>;
    modal?: React.ComponentClass<any>;
    confirm?: React.ComponentClass<any>;
    tri_state?: React.ComponentClass<any>;
}

interface InputConfigUpdate {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange?: (value: any) => void;
    props?: {
        [key: string]: any;
    };
}
interface PromptRequest {
    inputs: InputConfig[];
    props?: {
        [key: string]: any
    };
}

interface PromptState {
    show: boolean;
    modal_props: any;
    values: {
        [key: string]: any
    };
    inputs: any[];
    prompt_request: PromptRequest | null;
    tag: string | null;
}

interface HOCProps {
    confirm: (prompt_request: PromptRequest, confirmCB?: (values: LooseObject) => void, cancelCB?: () => void) => void;
    alert: (prompt_request: PromptRequest, confirmCB?: (values: LooseObject) => void) => void;
    cancel: () => void;
    isOpen: () => boolean;
    setTag: (tag: string) => void;
    getTag: () => string | null;
    setConfig: (input_config: InputConfig) => void;
}