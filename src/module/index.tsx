import * as React from 'react';
import oh from 'output-helpers';
import translations from './translations';

import formGenerator, { GeneratedForm } from './formGenerator';

import PromptModal from './PromptModal';
import TextInput, { TextInputConfig } from './input_components/TextInput';
import BoolInput, { BoolInputConfig } from './input_components/BoolInput';
import GridInput, { GridInputConfig } from './input_components/GridInput';
import SelectInput, { SelectInputConfig } from './input_components/SelectInput';
import MultiSelectInput, { MultiSelectInputConfig } from './input_components/MultiSelectInput';
import TextareaInput, { TextareaInputConfig } from './input_components/TextareaInput';
import TriStateInput, { TriStateInputConfig } from './input_components/TriStateInput';
// import * as NumericInput from './input_components/NumericInput';
import Button, { ButtonConfig } from './input_components/Button';


let valid_types = ["bool", "button", "confirm", "date", "grid", "number", "multi_select", "select", "text", "textarea", "tri_state"];


//Add translations of this repo to OH. Prefixed with "user_input_hoc_".
oh.addDictionary(translations);


export type ComponentLib = {
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

export type ValueInterface = {
    value?: any;
};
export type AnyInputConfig = ButtonConfig|TextInputConfig|BoolInputConfig|GridInputConfig|SelectInputConfig|MultiSelectInputConfig|TextareaInputConfig|TriStateInputConfig;
export type AnyInputConfigWithValue = AnyInputConfig & ValueInterface;
export type PromptInputConfigArray = Array<ButtonConfig|TextInputConfig|BoolInputConfig|GridInputConfig|SelectInputConfig|MultiSelectInputConfig|TextareaInputConfig|TriStateInputConfig>;
export type FormInputConfigArray = Array<ButtonConfig|TextInputConfig|BoolInputConfig|GridInputConfig|SelectInputConfig|MultiSelectInputConfig|TextareaInputConfig|TriStateInputConfig>;


export interface PromptState {
    prompt_config: PromptConfig | null;
    tag: string | null;
    form: GeneratedForm | null;
}
export interface FormState {
    values: {
        [key: string]: any
    };
    inputs: FormInputConfigArray;
    tag: string | null;
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

let default_components: ComponentLib = {
    text: TextInput,
    bool: BoolInput,
    grid: GridInput,
    button: Button,
    select: SelectInput,
    multi_select: MultiSelectInput,
    textarea: TextareaInput,
    tri_state: TriStateInput,
    confirm: Button,
    number: TextInput,
    date: TextInput
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
        input_components: ComponentObject = {
            text: TextInput,
            grid: GridInput,
            bool: BoolInput,
            select: SelectInput,
            multi_select: MultiSelectInput,
            textarea: TextareaInput,
            tri_state: TriStateInput,
            button: Button,
            confirm: Button
        };

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
            invalid_inputs = inputs.some(input => !this.input_components[input.type]);
            if (invalid_inputs) {
                throw new Error("UserInput: Inputs must be configured with a valid 'type'. " + valid_types.join(','));
            }
            this.confirmCB = confirmCB || null;
            this.cancelCB = cancelCB || null;

            let confirm_config: ButtonConfig = {
                label: prompt_config.confirm_button_label || oh.translate('user_input_hoc_confirm'),
                key: "confirm",
                type: "confirm",
                default_value: "",
                filled: true,
                big: true
            };
            let cancel_config: ButtonConfig = {
                label: prompt_config.confirm_button_label || oh.translate('user_input_hoc_cancel'),
                key: "cancel",
                type: "button",
                default_value: "",
                onClick: () => this.userCancelledCB(),
                filled: true,
                big: true
            };

            inputs.push(cancel_config, confirm_config);

            this.setState({
                form: formGenerator(default_components, inputs, (values: LooseObject) => this.userConfirmedCB(values)),
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
        if (input_configs.length < 1) {
            throw new Error("UserInput: GenerateInputs requires at least one input.");
        }
        if (!confirmCB) {
            let inputs_missing_cb = input_configs.filter(input => !input.onChange);
            if (inputs_missing_cb.length > 0) {
                throw new Error("UserInput: GenerateInputs without a confirmCB requires every input to specify a onChange callback.");
            }
        } else {
            let confirm_buttons = input_configs.some(input => input.type === "confirm");
            if (!confirm_buttons) {
                throw new Error("UserInput: GenerateInputs with a confirmCB is required to have at least one input of type 'confirm'.");
            }
        }
        let invalid_inputs = input_configs.some((input) => {
            return (input.type !== "confirm" && input.type !== "button") && input.hasOwnProperty("default_value") === false;
        });
        if (invalid_inputs) {
            throw new Error("UserInput: Every input that is not a 'button' or 'confirm' must be configured with a 'default_value'.");
        }
        invalid_inputs = input_configs.some(input => !valid_types.includes(input.type));
        if (invalid_inputs) {
            throw new Error("UserInput: Inputs must be configured with a valid 'type'. " + valid_types.join(','));
        }
        invalid_inputs = input_configs.some(input => (input.type !== 'button' && input.type !== 'confirm') && !input.hasOwnProperty('key'));
        if (invalid_inputs) {
            throw new Error("UserInput: Inputs that are not type 'button' or 'confirm' must be configured with a 'key' property. ");
        }
        return formGenerator(default_components, input_configs, confirmCB);
    }
}

export default InputHOC;
