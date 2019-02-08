import * as React from 'react';
import oh from 'output-helpers';
import translations from './translations';

import formGenerator, { validateFormGeneratorInputs } from './formGenerator';

import PromptModal from './PromptModal';
import * as TextImport from './input_components/TextInput';
import * as BoolImport from './input_components/BoolInput';
import * as GridImport from './input_components/GridInput';
import * as SelectImport from './input_components/SelectInput';
import * as MultiSelectImport from './input_components/MultiSelectInput';
import * as TextareaImport from './input_components/TextareaInput';
import * as TriStateImport from './input_components/TriStateInput';
import * as NumericImport from './input_components/NumericInput';
import * as ButtonImport from './input_components/Button';


export let valid_types = ["bool", "button", "confirm", "date", "grid", "numeric", "multi_select", "select", "text", "textarea", "tri_state"];


//Add translations of this repo to OH. Prefixed with "user_input_".
oh.addDictionary(translations);





export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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

export type UpdateConfig = {
    key: string;
    value?: any;
};
export type AnyInputConfig = ButtonImport.ButtonConfig | TextImport.TextInputConfig | BoolImport.BoolInputConfig | GridImport.GridInputConfig | SelectImport.SelectInputConfig | MultiSelectImport.MultiSelectInputConfig | NumericImport.NumericInputConfig | TextareaImport.TextareaInputConfig | TriStateImport.TriStateInputConfig;
export type AnyInputConfigWithValue = Partial<AnyInputConfig> & UpdateConfig & Pick<AnyInputConfig, "type">;
export type PromptInputConfigArray = Array<ButtonImport.ButtonConfig | TextImport.TextInputConfig | BoolImport.BoolInputConfig | GridImport.GridInputConfig | SelectImport.SelectInputConfig | MultiSelectImport.MultiSelectInputConfig | NumericImport.NumericInputConfig | TextareaImport.TextareaInputConfig | TriStateImport.TriStateInputConfig>;
export type FormInputConfigArray = Array<ButtonImport.ButtonConfig | TextImport.TextInputConfig | BoolImport.BoolInputConfig | GridImport.GridInputConfig | SelectImport.SelectInputConfig | MultiSelectImport.MultiSelectInputConfig | NumericImport.NumericInputConfig | TextareaImport.TextareaInputConfig | TriStateImport.TriStateInputConfig>;


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




export const input_imports: ComponentObject = {
    text: TextImport,
    bool: BoolImport,
    grid: GridImport,
    button: ButtonImport,
    select: SelectImport,
    multi_select: MultiSelectImport,
    textarea: TextareaImport,
    tri_state: TriStateImport,
    confirm: ButtonImport,
    numeric: NumericImport,
    date: TextImport
};




export function renderPrompt(form: GeneratedForm | null, prompt_config: PromptConfig | null, userCancelledCB: () => void) {
    if (!form || !prompt_config) {
        return null;
    }

    return (
        <PromptModal
            cancelCB={() => { userCancelledCB(); }}
            config={prompt_config}
            form={form}
        />
    );
}



export function InputHOC<P extends UserInputProps>(WrappedComponent: React.ComponentType<P>): React.ComponentClass<Omit<P, keyof UserInputProps>> {
    class Prompt extends React.Component<P, PromptState> {
        exports: HOCProps = {
            confirm: (user_prompt_request, confirmCB, cancelCB) => {
                if (user_prompt_request.hasOwnProperty("inputs") === false) {
                    user_prompt_request.inputs = [];
                }
                if (!user_prompt_request.title) {
                    throw new Error("prompt_props requires 'title' property.");
                }
                let default_settings = {
                    show_cancel_btn: true,
                    show_confirm_btn: true
                };
                let prompt_request: PromptConfig = Object.assign(
                    {},
                    user_prompt_request,
                    default_settings
                );
                this.initPrompt(prompt_request, confirmCB, cancelCB);
            },
            alert: (user_prompt_request, confirmCB) => {
                if (user_prompt_request.hasOwnProperty("inputs") === false) {
                    user_prompt_request.inputs = [];
                }
                if (!user_prompt_request.title) {
                    throw new Error("prompt_props requires 'title' property.");
                }
                let default_settings = {
                    show_cancel_btn: false,
                    show_confirm_btn: true
                };
                let prompt_request: PromptConfig = Object.assign(
                    {},
                    user_prompt_request,
                    default_settings
                );
                this.initPrompt(prompt_request, confirmCB);
            },
            cancel: () => {
                this.resetPrompt();
            },
            isOpen: () => {
                return this.state.prompt_config !== null;
            },
            setTag: (tag) => {
                this.setState({
                    tag: tag
                });
            },
            getTag: () => {
                return this.state.tag;
            },
            setConfig: (input_config: AnyInputConfigWithValue) => {
                if (this.state.form) {
                    this.state.form.setInputConfig(input_config);
                } else {
                    throw new Error("UserInput: Cannot setConfig without an open prompt.");
                }
            }
        };

        confirmCB: any = null;
        cancelCB: any = null;

        constructor(props: any) {
            super(props);

            this.state = {
                prompt_config: null,
                form: null,
                tag: null
            };
        }

        initPrompt(prompt_config: PromptConfig, confirmCB?: (value: any) => void, cancelCB?: () => void) {
            let inputs = [...prompt_config.inputs];
            let invalid_inputs = inputs.some(input => input.hasOwnProperty("default_value") === false);
            if (invalid_inputs) {
                throw new Error("UserInput: Inputs must be configured with a 'default_value'.");
            }
            invalid_inputs = inputs.some(input => !input_imports[input.type]);
            if (invalid_inputs) {
                throw new Error("UserInput: Inputs must be configured with a valid 'type'. " + valid_types.join(','));
            }
            this.confirmCB = confirmCB || null;
            this.cancelCB = cancelCB || null;

            let confirm_config: ButtonImport.ButtonConfig = {
                label: prompt_config.confirm_button_label || oh.translate('user_input_confirm'),
                key: "confirm",
                type: "confirm",
                default_value: "",
                filled: true,
                big: true
            };
            let cancel_config: ButtonImport.ButtonConfig = {
                label: prompt_config.confirm_button_label || oh.translate('user_input_cancel'),
                key: "cancel",
                type: "button",
                default_value: "",
                onClick: () => this.userCancelledCB(),
                filled: true,
                big: true
            };

            inputs.push(cancel_config, confirm_config);

            this.setState({
                form: formGenerator(inputs, (values: LooseObject) => this.userConfirmedCB(values)),
                prompt_config: prompt_config
            });
        }

        resetPrompt() {
            this.confirmCB = null;
            this.cancelCB = null;
            this.setState({
                form: null,
                prompt_config: null,
                tag: null
            });
        }

        userConfirmedCB(values: LooseObject) {
            //User clicked the confirm button.
            if (this.confirmCB) {
                this.confirmCB(values);
            }
            this.resetPrompt();
        }
        userCancelledCB() {
            //User clicked the cancel button.
            if (this.cancelCB) {
                //Exec the cancelCB if one was supplied.
                this.cancelCB();
            }
            this.resetPrompt();
        }

        render() {
            return (<div>
                <WrappedComponent userInputs={this.exports} {...this.props} />
                {
                    renderPrompt(
                        this.state.form,
                        this.state.prompt_config,
                        () => { this.userCancelledCB(); }
                    )
                }
            </div>);
        }
    }

    return Prompt;
}


export namespace InputHOC {
    export function generateForm(input_configs: FormInputConfigArray, confirmCB?: (value: any) => void): GeneratedForm {
        validateFormGeneratorInputs(input_configs, confirmCB);
        return formGenerator(input_configs, confirmCB);
    }
}

export default InputHOC;
