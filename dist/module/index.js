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
let valid_types = ["bool", "button", "confirm", "date", "grid", "number", "multi_select", "select", "text", "textarea", "tri_state"];
//Add translations of this repo to OH. Prefixed with "user_input_hoc_".
oh.addDictionary(translations);
let default_components = {
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
let custom_components = {};
export function renderInputs(inputs, values, inputValueChangeCB, confirmClickCB) {
    return inputs.map((input_config) => {
        const key = input_config.key;
        const InputComp = custom_components[input_config.type] || default_components[input_config.type];
        if (input_config.type === "confirm") {
            let suppliedOnClickCB;
            if (input_config.hasOwnProperty("onClick")) {
                suppliedOnClickCB = input_config.onClick;
            }
            return React.createElement(InputComp, { key: key, config: input_config, value: values[key], onClick: () => {
                    if (confirmClickCB) {
                        confirmClickCB();
                    }
                    if (suppliedOnClickCB) {
                        suppliedOnClickCB();
                    }
                } });
        }
        return React.createElement(InputComp, { key: key, config: input_config, value: values[key], onChange: (value) => {
                inputValueChangeCB(key, value);
            } });
    });
}
export function renderPrompt(show, inputs, values, modal_props, valueChangeCB, userConfirmedCB, userCancelledCB) {
    if (show !== true) {
        return null;
    }
    let Modal = PromptModal;
    return (React.createElement(Modal, Object.assign({ confirmCB: (values) => { userConfirmedCB(values); }, cancelCB: () => { userCancelledCB(); }, renderInputs: () => { return renderInputs(inputs, values, valueChangeCB); } }, modal_props)));
}
export function InputHOC(WrappedComponent) {
    class Prompt extends React.Component {
        constructor(props) {
            super(props);
            this.exports = {
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
                    prompt_request.prompt_props = Object.assign({}, default_props, prompt_request.prompt_props);
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
                    prompt_request.prompt_props = Object.assign({}, default_props, prompt_request.prompt_props);
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
                setConfig: (input_config) => {
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
                        }
                        else if (input_config.type === "select") {
                            let selected_option = input_config.options.find(option => input_config.value === option.value);
                            if (!selected_option) {
                                throw new Error("UserInput: Value for select not present in options.");
                            }
                            values[input_config.key] = selected_option;
                        }
                        else {
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
            this.state = {
                show: false,
                modal_props: {},
                values: {},
                prompt_request: null,
                tag: null,
                inputs: []
            };
        }
        initPrompt(prompt_request, confirmCB, cancelCB) {
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
            let values = {};
            inputs.forEach((input) => {
                if (input.type === "multi_select") {
                    let selected_options = input.options.filter(option => input.default_value.includes(option.value));
                    if (selected_options.length !== input.default_value.length) {
                        throw new Error("UserInput: Default values for multiselect not present in options.");
                    }
                    values[input.key] = selected_options;
                }
                else if (input.type === "select") {
                    let selected_option = input.options.find(option => input.default_value === option.value);
                    if (!selected_option) {
                        throw new Error("UserInput: Default value for select not present in options.");
                    }
                    values[input.key] = selected_option;
                }
                else {
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
        userConfirmedCB(values) {
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
        inputValueChangeCB(key, value) {
            let values = Object.assign({}, this.state.values);
            values[key] = value;
            this.setState({
                values: values
            });
        }
        render() {
            return (React.createElement("div", null,
                React.createElement(WrappedComponent, Object.assign({ userInputs: this.exports }, this.props)),
                renderPrompt(this.state.show, this.state.inputs, this.state.values, this.state.modal_props, (key, value) => { this.inputValueChangeCB(key, value); }, (values) => { this.userConfirmedCB(values); }, () => { this.userCancelledCB(); })));
        }
    }
    return Prompt;
}
(function (InputHOC) {
    function setCustomComponents(object_with_components) {
        custom_components = object_with_components;
    }
    InputHOC.setCustomComponents = setCustomComponents;
    function generateForm(input_configs, confirmCB) {
        if (input_configs.length < 1) {
            throw new Error("UserInput: GenerateInputs requires at least one input.");
        }
        if (!confirmCB) {
            let inputs_missing_cb = input_configs.filter(input => !input.onChange);
            if (inputs_missing_cb.length > 0) {
                throw new Error("UserInput: GenerateInputs without a confirmCB requires every input to specify a onChange callback.");
            }
        }
        else {
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
    InputHOC.generateForm = generateForm;
})(InputHOC || (InputHOC = {}));
export default InputHOC;

//# sourceMappingURL=index.js.map
