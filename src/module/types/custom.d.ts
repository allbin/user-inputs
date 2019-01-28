declare module "*.svg" {
    const content: any;
    export default content;
}
declare module "quagga" {}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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
