declare module "*.svg" {
    const content: any;
    export default content;
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

interface LooseObject {
    [key: string]: any;
}