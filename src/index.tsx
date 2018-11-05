import * as React from 'react';
import oh from 'output-helpers';
import translations from './translations';

import * as formGenerator from './formGenerator';

import PromptModal from './PromptModal';
import TextInput from './input_components/TextInput';
import BoolInput from './input_components/BoolInput';
import GridInput from './input_components/GridInput';
import SelectInput from './input_components/SelectInput';
import MultiSelectInput from './input_components/MultiSelectInput';
import TextareaInput from './input_components/TextareaInput';
import TriStateInput from './input_components/TriStateInput';
import Button from './input_components/Button';


export type InputType = "bool" | "button" | "confirm" | "date" | "grid" | "number" | "multi_select" | "select" | "text" | "textarea" | "tri_state";
export interface LooseObject {
    [key: string]: any;
}
export interface InputConfig {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange?: (any) => void;
    props: {
        [key: string]: any;
    };
}
export interface InputConfigUpdate {
    [key: string]: any;
    default_value: any;
    type: InputType;
    key: string;
    onChange?: (any) => void;
    props?: {
        [key: string]: any;
    };
}
export interface PromptRequest {
    inputs: InputConfig[];
    props?: {
        [key: string]: any
    };
}
export interface ComponentObject {
    bool?: typeof React.Component;
    button?: typeof React.Component;
    date?: typeof React.Component;
    grid?: typeof React.Component;
    number?: typeof React.Component;
    select?: typeof React.Component;
    text?: typeof React.Component;
    textarea?: typeof React.Component;
    multi_select?: typeof React.Component;
    modal?: typeof React.Component;
    confirm?: typeof React.Component;
    tri_state?: typeof React.Component;
}
export interface PromptState {
    show?: boolean;
    modal_props?: any;
    values?: {
        [key: string]: any
    };
    inputs?: any[];
    prompt_request: PromptRequest | null;
    tag: string | null;
}

export interface HOCProperties {
    confirm: (prompt_request: PromptRequest, confirmCB?: (LooseObject) => void, cancelCB?: () => void) => void;
    alert: (prompt_request: PromptRequest, confirmCB?: (LooseObject) => void) => void;
    cancel: () => void;
    isOpen: () => boolean;
    setTag: (tag: string) => void;
    getTag: () => string | null;
    setConfig: (input_config: InputConfig) => void;
}





let valid_types = ["bool", "button", "confirm", "date", "grid", "number", "multi_select", "select", "text", "textarea", "tri_state"];


//Add translations of this repo to OH. Prefixed with "user_input_hoc_".
oh.addDictionary(translations);



let default_components: ComponentObject = {
    text: TextInput,
    bool: BoolInput,
    grid: GridInput,
    button: Button,
    select: SelectInput,
    multi_select: MultiSelectInput,
    textarea: TextareaInput,
    tri_state: TriStateInput,
    confirm: Button,
};
let custom_components: ComponentObject = {};







export function InputHOC (
    WrappedComponent: typeof React.Component
): typeof React.Component {
    class Prompt extends React.Component<any, PromptState> {
        exports: {
            confirm: (prompt_request: PromptRequest, confirmCB: (any) => void, cancelCB: () => void) => void;
            cancel: () => void;
            setConfig: (input_config: InputConfig) => void;
            isOpen: () => boolean;
            alert: (prompt_request: PromptRequest, confirmCB: (any) => void) => void;
            setTag: (tag: string) => void;
            getTag: () => string | null;
        };
        confirmCB: any;
        cancelCB: any;
        input_components: ComponentObject;

        constructor(props) {
            super(props);

            this.state = {
                show: false,
                modal_props: {},
                values: {},
                prompt_request: null,
                tag: null
            };

            this.exports = {
                confirm: (prompt_request, confirmCB, cancelCB) => {
                    if (prompt_request.hasOwnProperty("inputs") === false) {
                        prompt_request.inputs = [];
                    }
                    if (prompt_request.hasOwnProperty("props") === false) {
                        prompt_request.props = {};
                    }
                    let default_props = {
                        show_cancel_btn: true,
                        show_confirm_btn: true
                    };
                    prompt_request.props = Object.assign(
                        {},
                        default_props,
                        prompt_request.props
                    );
                    this.initPrompt(prompt_request, confirmCB, cancelCB);
                },
                alert: (prompt_request, confirmCB) => {
                    if (prompt_request.hasOwnProperty("inputs") === false) {
                        prompt_request.inputs = [];
                    }
                    if (prompt_request.hasOwnProperty("props") === false) {
                        prompt_request.props = {};
                    }
                    let default_props = {
                        show_cancel_btn: false,
                        show_confirm_btn: true
                    };
                    prompt_request.props = Object.assign(
                        {},
                        default_props,
                        prompt_request.props
                    );
                    this.initPrompt(prompt_request, confirmCB);
                },
                cancel: () => {
                    this.cancelRequest();
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
                setConfig: (input_config: InputConfig) => {
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
            this.confirmCB = null;
            this.cancelCB = null;

            this.input_components = {
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
        }

        initPrompt(prompt_request: PromptRequest, confirmCB?: (any) => void, cancelCB?: () => void) {
            let inputs = prompt_request.inputs;
            let props = prompt_request.props;
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
            let values = {};
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

        cancelRequest() {
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

        userConfirmedCB() {
            this.setState({
                show: false
            });
            let values = Object.assign({}, this.state.values);
            this.state.inputs.forEach((input) => {
                if ((input.type === "text" || input.type === "textarea") && (!input.hasOwnProperty("trim") || input.trim === true)) {
                    if (typeof values[input.key] === "string") {
                        values[input.key] = values[input.key].trim();
                    }
                }
                if (input.type === "select") {
                    values[input.key] = values[input.key].value;
                }
                if (input.type === "multi_select") {
                    values[input.key] = values[input.key].map(option => option.value);
                }
            });
            if (this.confirmCB) {
                this.confirmCB(values);
                this.confirmCB = null;
                this.cancelCB = null;
            }
        }
        userCancelledCB() {
            this.setState({
                show: false
            });
            if (this.cancelCB) {
                this.cancelCB();
                this.cancelCB = null;
                this.confirmCB = null;
            }
        }

        inputValueChangeCB(key, value) {
            let values = Object.assign({}, this.state.values);
            values[key] = value;
            this.setState({
                values: values
            });
        }

        renderInputs() {
            if (!this.state.inputs) { return null; }
            return this.state.inputs.map((input_request, index) => {
                let InputComponent = this.input_components[input_request.type];
                if (custom_components && custom_components.hasOwnProperty(input_request.type)) {
                    InputComponent = custom_components[input_request.type];
                }
                let input_component_props = input_request.props || {};
                let key = input_request.key || "input_" + index;
                if (input_request.type === "confirm") {
                    let suppliedOnClickCB = null;
                    if (input_component_props.hasOwnProperty("onClick")) {
                        suppliedOnClickCB = input_component_props.onClick;
                        delete input_component_props.suppliedOnClickCB;
                    }
                    return <InputComponent
                        key={key}
                        config={input_request}
                        value={this.state.values[key]}
                        onClick={(value) => {
                            this.userConfirmedCB();
                            if (suppliedOnClickCB) {
                                suppliedOnClickCB();
                            }
                        }}
                        {...input_component_props}
                    />;
                }
                return <InputComponent
                    key={key}
                    config={input_request}
                    value={this.state.values[key]}
                    onChange={(value) => {
                        if (input_request.onChange) {
                            input_request.onChange(value);
                        }
                        this.inputValueChangeCB(key, value);
                    }}
                    {...input_component_props}
                />;
            });
        }

        renderPrompt() {
            if (!this.state.show) { return null; }
            let Modal: typeof React.Component = PromptModal;
            if (custom_components && custom_components.hasOwnProperty("modal")) {
                Modal = custom_components.modal;
            }
            return (
                <Modal
                    confirmCB={() => { this.userConfirmedCB(); }}
                    cancelCB={() => { this.userCancelledCB(); }}
                    renderInputs={() => { return this.renderInputs(); }}
                    {...this.state.modal_props}
                />
            );
        }

        render() {
            return (<div>
                <WrappedComponent userPrompt={this.exports} {...this.props} />
                { this.renderPrompt() }
            </div>);
        }
    }

    return Prompt;
}


export namespace InputHOC {
    export function setCustomComponents(object_with_components: ComponentObject) {
        custom_components = object_with_components;
    }
    export function generateForm(input_configs: InputConfig[], confirmCB?: (any) => void) {
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
