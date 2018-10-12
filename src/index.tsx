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
import Button from './input_components/Button';

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
    tri_state: GridInput
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
                    prompt_request.props.show_cancel_btn = true;
                    this.initPrompt(prompt_request, confirmCB, cancelCB);
                },
                alert: (prompt_request, confirmCB) => {
                    if (prompt_request.hasOwnProperty("inputs") === false) {
                        prompt_request.inputs = [];
                    }
                    if (prompt_request.hasOwnProperty("props") === false) {
                        prompt_request.props = {};
                    }
                    prompt_request.props.show_cancel_btn = false;
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
                        values[input_config.key] = input_config.value;
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
                tri_state: GridInput
            };
        }

        initPrompt(prompt_request: PromptRequest, confirmCB?: (any) => void, cancelCB?: () => void) {
            let inputs = prompt_request.inputs;
            let props = prompt_request.props;
            let invalid_inputs = inputs.some(input => input.type === "button" || input.type === "confirm");
            if (invalid_inputs) {
                throw new Error("UserInput: Inputs of type 'button' OR 'confirm' are not allowed in prompt.");
            }
            invalid_inputs = inputs.some(input => input.hasOwnProperty("default_value") === false);
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
            inputs.forEach(input => values[input.key] = input.default_value);
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
                if (input.type === "select") {
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
