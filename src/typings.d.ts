type InputType = "bool" | "button" | "confirm" | "date" | "grid" | "number" | "select" | "text";
interface InputConfig {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange: (any) => void;
    props: {
        [key: string]: any;
    }
}
interface InputConfigUpdate {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange: (any) => void;
    props: {
        [key: string]: any;
    }
}
interface PromptRequest {
    inputs: InputConfig[];
    props?: object;
}
interface PromptState {
    show?: boolean;
    modal_props?: any;
    values?: {
        [key: string]: any
    };
    inputs?: any[];
}
interface ComponentObject {
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