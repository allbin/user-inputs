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

