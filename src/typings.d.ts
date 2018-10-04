type InputType = "bool" | "button" | "confirm" | "date" | "grid" | "number" | "multi_select" | "select" | "text" | "textarea";
interface InputConfig {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange: (any) => void;
    props: {
        [key: string]: any;
    };
}
interface InputConfigUpdate {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange: (any) => void;
    props: {
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
    show?: boolean;
    modal_props?: any;
    values?: {
        [key: string]: any
    };
    inputs?: any[];
    prompt_request: PromptRequest | null;
    tag: string | null;
}
interface ComponentObject {
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
}