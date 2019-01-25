declare module "*.svg" {
    const content: any;
    export default content;
}
declare module "quagga" {}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type InputType = "bool" | "button" | "confirm" | "date" | "grid" | "number" | "multi_select" | "select" | "text" | "textarea" | "tri_state";
interface LooseObject {
    [key: string]: any;
}
interface SelectOption {
    value: string|number;
    label: string;
}
interface TriStateInputOption {
    value: string|number;
    label: string;
}
interface MultiSelectOption {
    value: string|number;
    label: string;
}
interface GridSelectOption {
    value: string|number;
    label: string;
    color?: string;
}

interface InputConfigOld2 {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange?: (value: any) => void;
    props: {
        [key: string]: any;
    };
    options: SelectOption[];
}

interface Test1 {
    type: "text";
    onChange: (value: string) => void;
    aa: boolean;
}
interface Test2 {
    type: "select";
    onChange: (value: SelectOption) => void;
    bb: string;
}

interface Test4 {
    func: (inputs: (Test1|Test2)[]) => void;
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

