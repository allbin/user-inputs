import * as React from 'react';
import * as TextImport from './input_components/TextInput';
import * as BoolImport from './input_components/BoolInput';
import * as GridImport from './input_components/GridInput';
import * as SelectImport from './input_components/SelectInput';
import * as MultiSelectImport from './input_components/MultiSelectInput';
import * as TextareaImport from './input_components/TextareaInput';
import * as TriStateImport from './input_components/TriStateInput';
import * as NumericImport from './input_components/NumericInput';
import * as ButtonImport from './input_components/Button';
export declare let valid_types: string[];
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface LooseObject {
    [key: string]: any;
}
export interface SelectOption {
    value: string | number;
    label: string;
}
export interface TriStateInputOption {
    value: string | number;
    label: string;
}
export interface MultiSelectOption {
    value: string | number;
    label: string;
}
export interface GridSelectOption {
    value: string | number;
    label: string;
    color?: string;
}
export interface GeneratedForm {
    component: typeof React.Component;
    reset: () => void;
    resetConfirmClick: () => void;
    getValues: () => LooseObject;
    setInputConfig: (updated_config: AnyInputConfigWithValue) => void;
}
export interface HOCProps {
    /** Opens a prompt using supplied config which has a single Confirm button. */
    alert: (prompt_request: UserInputPromptConfig, confirmCB?: (values: LooseObject) => void) => void;
    /** Closes any open prompt without triggering any Confirm or Cancel callbacks. */
    cancel: () => void;
    /** Opens a prompt using supplied config which has a Confirm and Cancel button. */
    confirm: (prompt_request: UserInputPromptConfig, confirmCB?: (values: LooseObject) => void, cancelCB?: () => void) => void;
    /** Returns current tag. If no tag has been set returns null. */
    getTag: () => string | null;
    /** Returns true if a prompt is currently showing to the user. Otherwise false. */
    isOpen: () => boolean;
    /** Modify the config a currently open prompt. */
    setConfig: (input_config: AnyInputConfigWithValue) => void;
    /** Set tag. */
    setTag: (tag: string) => void;
}
export declare type UpdateConfig = {
    key: string;
    value?: any;
};
export declare type AnyInputConfig = ButtonImport.ButtonConfig | TextImport.TextInputConfig | BoolImport.BoolInputConfig | GridImport.GridInputConfig | SelectImport.SelectInputConfig | MultiSelectImport.MultiSelectInputConfig | NumericImport.NumericInputConfig | TextareaImport.TextareaInputConfig | TriStateImport.TriStateInputConfig;
export declare type AnyInputConfigWithValue = Partial<AnyInputConfig> & UpdateConfig & Pick<AnyInputConfig, "type">;
export declare type PromptInputConfigArray = Array<ButtonImport.ButtonConfig | TextImport.TextInputConfig | BoolImport.BoolInputConfig | GridImport.GridInputConfig | SelectImport.SelectInputConfig | MultiSelectImport.MultiSelectInputConfig | NumericImport.NumericInputConfig | TextareaImport.TextareaInputConfig | TriStateImport.TriStateInputConfig>;
export declare type FormInputConfigArray = Array<ButtonImport.ButtonConfig | TextImport.TextInputConfig | BoolImport.BoolInputConfig | GridImport.GridInputConfig | SelectImport.SelectInputConfig | MultiSelectImport.MultiSelectInputConfig | NumericImport.NumericInputConfig | TextareaImport.TextareaInputConfig | TriStateImport.TriStateInputConfig>;
export interface PromptState {
    prompt_config: PromptConfig | null;
    tag: string | null;
    form: GeneratedForm | null;
}
export interface UserInputPromptConfig {
    title: string;
    inputs: PromptInputConfigArray;
    message?: string;
    classes?: string;
    confirmCB?: () => void;
    cancelCB?: () => void;
    confirm_button_label?: string;
    cancel_button_label?: string;
}
export interface UserInputProps {
    userInputs: HOCProps;
}
export interface PromptConfig extends UserInputPromptConfig {
    show_cancel_btn: boolean;
    show_confirm_btn: boolean;
}
interface InputComponentExports {
    Input: React.ComponentClass<any>;
    convertInternalToExternalValue: (cfg: any, value: any) => any;
    validateConfig: (cfg: any) => null | string;
    validate: (cfg: any, value: any) => null | string;
    convertExternalToInternalValue: (cfg: any, value: any) => any;
}
export interface ComponentObject {
    [key: string]: InputComponentExports;
    bool: InputComponentExports;
    button: InputComponentExports;
    date: InputComponentExports;
    grid: InputComponentExports;
    numeric: InputComponentExports;
    select: InputComponentExports;
    text: InputComponentExports;
    textarea: InputComponentExports;
    multi_select: InputComponentExports;
    confirm: InputComponentExports;
    tri_state: InputComponentExports;
}
export declare const input_imports: ComponentObject;
export declare function renderPrompt(form: GeneratedForm | null, prompt_config: PromptConfig | null, userCancelledCB: () => void): JSX.Element | null;
export declare function InputHOC<P extends UserInputProps>(WrappedComponent: React.ComponentType<P>): React.ComponentClass<Omit<P, keyof UserInputProps>>;
export declare namespace InputHOC {
    function generateForm(input_configs: FormInputConfigArray, confirmCB?: (value: any) => void): GeneratedForm;
}
export default InputHOC;
