import * as React from 'react';
import * as formGenerator from './formGenerator';
import { TextInputConfig } from './input_components/TextInput';
import { BoolInputConfig } from './input_components/BoolInput';
import { GridInputConfig } from './input_components/GridInput';
import { SelectInputConfig } from './input_components/SelectInput';
import { MultiSelectInputConfig } from './input_components/MultiSelectInput';
import { TextareaInputConfig } from './input_components/TextareaInput';
import { TriStateInputConfig } from './input_components/TriStateInput';
import { ButtonConfig } from './input_components/Button';
export declare type ComponentLib = {
    [key in InputType]: typeof React.Component;
};
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
export declare type ValueInterface = {
    value?: any;
};
export declare type AnyInputConfig = ButtonConfig | TextInputConfig | BoolInputConfig | GridInputConfig | SelectInputConfig | MultiSelectInputConfig | TextareaInputConfig | TriStateInputConfig;
export declare type AnyInputConfigWithValue = AnyInputConfig & ValueInterface;
export declare type PromptInputConfigArray = Array<TextInputConfig | BoolInputConfig | GridInputConfig | SelectInputConfig | MultiSelectInputConfig | TextareaInputConfig | TriStateInputConfig>;
export declare type FormInputConfigArray = Array<ButtonConfig | TextInputConfig | BoolInputConfig | GridInputConfig | SelectInputConfig | MultiSelectInputConfig | TextareaInputConfig | TriStateInputConfig>;
interface PromptRequest {
    inputs: PromptInputConfigArray;
    props?: {
        [key: string]: any;
    };
}
export interface PromptState {
    show: boolean;
    modal_props: any;
    values: {
        [key: string]: any;
    };
    inputs: PromptInputConfigArray;
    prompt_request: PromptRequest | null;
    tag: string | null;
}
export interface FormState {
    values: {
        [key: string]: any;
    };
    inputs: FormInputConfigArray;
    tag: string | null;
}
export interface UserInputPromptConfig {
    /** Props sent to the PromptModal component. */
    prompt_props: {
        title: string;
        message?: string;
        classes?: string;
        confirmCB?: () => void;
        cancelCB?: () => void;
    };
    inputs: PromptInputConfigArray;
}
export interface UserInputProps {
    userInputs: HOCProps;
}
export declare function renderInputs(inputs: FormInputConfigArray, values: LooseObject, inputValueChangeCB: (key: string, value: any) => void, confirmClickCB?: (() => void)): JSX.Element[];
export declare function renderPrompt(show: boolean, inputs: PromptInputConfigArray, values: LooseObject, modal_props: LooseObject, valueChangeCB: (key: string, value: any) => void, userConfirmedCB: (values: LooseObject) => void, userCancelledCB: () => void): JSX.Element | null;
export declare function InputHOC<P extends UserInputProps>(WrappedComponent: React.ComponentType<P>): React.ComponentClass<Omit<P, keyof UserInputProps>>;
export declare namespace InputHOC {
    function setCustomComponents(object_with_components: ComponentObject): void;
    function generateForm(input_configs: FormInputConfigArray, confirmCB?: (value: any) => void): formGenerator.GeneratedForm;
}
export default InputHOC;
