import * as React from 'react';
import oh from 'output-helpers';
import translations from './translations';

import * as formGenerator from './formGenerator';

import PromptModal from './PromptModal';
import TextInput, { TextInputConfig } from './input_components/TextInput';
import BoolInput, { BoolInputConfig } from './input_components/BoolInput';
import GridInput, { GridInputConfig } from './input_components/GridInput';
import SelectInput, { SelectInputConfig } from './input_components/SelectInput';
import MultiSelectInput, { MultiSelectInputConfig } from './input_components/MultiSelectInput';
import TextareaInput, { TextareaInputConfig } from './input_components/TextareaInput';
import TriStateInput, { TriStateInputConfig } from './input_components/TriStateInput';
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
export type PromptInputConfigArray = Array<TextInputConfig|BoolInputConfig|GridInputConfig|SelectInputConfig|MultiSelectInputConfig|TextareaInputConfig|TriStateInputConfig>;
export type FormInputConfigArray = Array<ButtonConfig|TextInputConfig|BoolInputConfig|GridInputConfig|SelectInputConfig|MultiSelectInputConfig|TextareaInputConfig|TriStateInputConfig>;

interface PromptRequest {
    inputs: PromptInputConfigArray;
    props?: {
        [key: string]: any
    };
}

export interface PromptState {
    show: boolean;
    modal_props: any;
    values: {
        [key: string]: any
    };
    inputs: PromptInputConfigArray;
    prompt_request: PromptRequest | null;
    tag: string | null;
}
export interface FormState {
    values: {
        [key: string]: any
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
let custom_components: Partial<ComponentLib> = {};



export function renderInputs(inputs: FormInputConfigArray, values: LooseObject, inputValueChangeCB: (key: string, value: any) => void, confirmClickCB?: (() => void)) {
    return inputs.map((input_config) => {
        const key = input_config.key;
        const InputComp: typeof React.Component = custom_components[input_config.type] || default_components[input_config.type];

        if (input_config.type === "confirm") {
            let suppliedOnClickCB: (() => void) | undefined;
            if (input_config.hasOwnProperty("onClick")) {
                suppliedOnClickCB = input_config.onClick;
            }
            return <InputComp
                key={key}
                config={input_config}
                value={values[key]}
                onClick={() => {
                    if (confirmClickCB) {
                        confirmClickCB();
                    }
                    if (suppliedOnClickCB) {
                        suppliedOnClickCB();
                    }
                }}
            />;
        }
        return <InputComp
            key={key}
            config={input_config}
            value={values[key]}
            onChange={(value: any) => {
                inputValueChangeCB(key, value);
            }}
        />;
    });
}

export function renderPrompt(show: boolean, inputs: PromptInputConfigArray, values: LooseObject, modal_props: LooseObject, valueChangeCB: (key: string, value: any) => void, userConfirmedCB: (values: LooseObject) => void, userCancelledCB: () => void) {
    if (show !== true) {
        return null;
    }
    let Modal: typeof React.Component = PromptModal;

    return (
        <Modal
            confirmCB={(values: LooseObject) => { userConfirmedCB(values); }}
            cancelCB={() => { userCancelledCB(); }}
            renderInputs={() => { return renderInputs(inputs, values, valueChangeCB); }}
            {...modal_props}
        />
    );
}



export function InputHOC<P extends UserInputProps>(WrappedComponent: React.ComponentType<P>): React.ComponentClass<Omit<P, keyof UserInputProps>> {
    class Prompt extends React.Component<P, PromptState> {
        exports: HOCProps = {
            confirm: (prompt_request, confirmCB, cancelCB) => {
                if (prompt_request.hasOwnProperty("inputs") === false) {
                    prompt_request.inputs = [];
                }
                if (prompt_request.hasOwnProperty("prompt_props") === false) {
                    throw new Error("prompt_props are required in config for alert.");
                }
                if (!prompt_request.prompt_props.title) {
                    throw new Error("prompt_props requires 'title' property.");
                }
                let default_props = {
                    show_cancel_btn: true,
                    show_confirm_btn: true
                };
                prompt_request.prompt_props = Object.assign(
                    {},
                    default_props,
                    prompt_request.prompt_props
                );
                this.initPrompt(prompt_request, confirmCB, cancelCB);
            },
            alert: (prompt_request, confirmCB) => {
                if (prompt_request.hasOwnProperty("inputs") === false) {
                    prompt_request.inputs = [];
                }
                if (prompt_request.hasOwnProperty("prompt_props") === false) {
                    throw new Error("prompt_props are required in config for alert.");
                }
                if (!prompt_request.prompt_props.title) {
                    throw new Error("prompt_props requires 'title' property.");
                }
                let default_props = {
                    show_cancel_btn: false,
                    show_confirm_btn: true
                };
                prompt_request.prompt_props = Object.assign(
                    {},
                    default_props,
                    prompt_request.prompt_props
                );
                this.initPrompt(prompt_request, confirmCB);
            },
            cancel: () => {
                this.resetPrompt();
            },
            isOpen: () => {
                return this.state.show;
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
                if (input_config.hasOwnProperty("key") === false) {
                    throw new Error("UserInput: input_config must contain 'key' property.");
                }
                let inputs = this.state.inputs;
                let input_index = inputs.findIndex(input => input.key === input_config.key);
                if (input_index < 0) {
                    throw new Error("UserInput: Key not found in existing inputs. Key must match an input created with 'promp()'.");
                }
                let values = this.state.values;
                if (input_config.hasOwnProperty("value")) {
                    if (input_config.type === "multi_select") {
                        let selected_options = input_config.options.filter(option => input_config.value.includes(option.value));
                        if (selected_options.length !== input_config.value.length) {
                            throw new Error("UserInput: Values for multiselect not present in options.");
                        }
                        values[input_config.key] = selected_options;
                    } else if (input_config.type === "select") {
                        let selected_option = input_config.options.find(option => input_config.value === option.value);
                        if (!selected_option) {
                            throw new Error("UserInput: Value for select not present in options.");
                        }
                        values[input_config.key] = selected_option;
                    } else {
                        values[input_config.key] = input_config.value;
                    }
                }
                inputs[input_index] = Object.assign({}, inputs[input_index], input_config);
                this.setState({
                    inputs: inputs,
                    values: values
                });
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
                show: false,
                modal_props: {},
                values: {},
                prompt_request: null,
                tag: null,
                inputs: []
            };
        }

        initPrompt(prompt_request: UserInputPromptConfig, confirmCB?: (value: any) => void, cancelCB?: () => void) {
            let inputs = prompt_request.inputs;
            let props = prompt_request.prompt_props;
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
            let values: { [key: string]: any; } = {};
            inputs.forEach((input) => {
                if (input.type === "multi_select") {
                    let selected_options = input.options.filter(option => input.default_value.includes(option.value));
                    if (selected_options.length !== input.default_value.length) {
                        throw new Error("UserInput: Default values for multiselect not present in options.");
                    }
                    values[input.key] = selected_options;
                } else if (input.type === "select") {
                    let selected_option = input.options.find(option => input.default_value === option.value);
                    if (!selected_option) {
                        throw new Error("UserInput: Default value for select not present in options.");
                    }
                    values[input.key] = selected_option;
                } else {
                    values[input.key] = input.default_value;
                }
            });
            this.setState({
                show: true,
                modal_props: props,
                inputs: inputs,
                values: values,
                prompt_request: prompt_request
            });
        }

        resetPrompt() {
            this.confirmCB = null;
            this.cancelCB = null;
            this.setState({
                show: false,
                inputs: [],
                values: [],
                prompt_request: null,
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

        inputValueChangeCB(key: string, value: any) {
            let values = Object.assign({}, this.state.values);
            values[key] = value;
            this.setState({
                values: values
            });
        }

        render() {
            return (<div>
                <WrappedComponent userInputs={this.exports} {...this.props} />
                {
                    renderPrompt(
                        this.state.show,
                        this.state.inputs,
                        this.state.values,
                        this.state.modal_props,
                        (key: string, value: any) => { this.inputValueChangeCB(key, value); },
                        (values: LooseObject) => { this.userConfirmedCB(values); },
                        () => { this.userCancelledCB(); }
                    )
                }
            </div>);
        }
    }

    return Prompt;
}


export namespace InputHOC {
    export function setCustomComponents(object_with_components: ComponentObject) {
        custom_components = object_with_components;
    }
    export function generateForm(input_configs: FormInputConfigArray, confirmCB?: (value: any) => void): formGenerator.GeneratedForm {
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
        return formGenerator.getInputForm(default_components, custom_components, input_configs, confirmCB);
    }
}

export default InputHOC;
