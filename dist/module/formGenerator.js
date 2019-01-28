import * as React from 'react';
export function getInputForm(default_components, custom_components, input_configs, cb) {
    let mounted_forms = [];
    class InputWrapper extends React.Component {
        constructor(props) {
            super(props);
            let values = {};
            input_configs.forEach((input) => {
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
            this.state = {
                values: values,
                inputs: input_configs,
                tag: null,
            };
            this.confirmCB = cb || null;
            this.input_components = {
                text: default_components.text,
                textarea: default_components.textarea,
                grid: default_components.grid,
                bool: default_components.bool,
                multi_select: default_components.multi_select,
                select: default_components.select,
                button: default_components.button,
                confirm: default_components.button,
                tri_state: default_components.tri_state
            };
        }
        componentDidMount() {
            mounted_forms.push(this);
        }
        componentWillUnmount() {
            let mount_index = mounted_forms.findIndex(form => form === this);
            mounted_forms.splice(mount_index, 1);
        }
        setConfig(input_config) {
            let inputs = this.state.inputs;
            let input_index = inputs.findIndex(input => input.key === input_config.key);
            if (input_index < 0) {
                throw new Error("UserInput: Key not found in existing inputs. Key must match an input created with 'generateForm()'.");
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
        getValues() {
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
                    values[input.key] = values[input.key].map((option) => option.value);
                }
            });
            return values;
        }
        resetValues() {
            let default_values = input_configs.map(input => input.default_value);
            this.setState({ values: default_values });
        }
        userConfirmedCB() {
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
                    values[input.key] = values[input.key].map((option) => option.value);
                }
            });
            if (this.confirmCB) {
                this.confirmCB(values);
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
            return this.state.inputs.map((input_request, index) => {
                let InputComponent = this.input_components[input_request.type];
                if (custom_components && custom_components.hasOwnProperty(input_request.type)) {
                    InputComponent = custom_components[input_request.type];
                }
                let key = input_request.key || "input_" + index;
                if (input_request.type === "confirm" || input_request.type === "button") {
                    return React.createElement(InputComponent, { key: key, config: input_request, value: this.state.values[key], onClick: () => {
                            this.userConfirmedCB();
                        } });
                }
                return React.createElement(InputComponent, { key: key, config: input_request, value: this.state.values[key], onChange: (value) => {
                        this.inputValueChangeCB(key, value);
                    } });
            });
        }
        render() {
            return (React.createElement("div", null, this.renderInputs()));
        }
    }
    return {
        component: InputWrapper,
        reset: () => {
            mounted_forms.forEach((form) => {
                form.resetValues();
            });
        },
        getForms: () => {
            return mounted_forms;
        },
        getValues: () => {
            return mounted_forms.map((form) => {
                return {
                    values: form.getValues(),
                    ref: form
                };
            });
        },
        setInputConfig: (updated_config) => {
            if (updated_config.hasOwnProperty("key") === false) {
                throw new Error("UserInput: input_config must contain 'key' property.");
            }
            let inputs = input_configs;
            let input_index = inputs.findIndex(input => input.key === updated_config.key);
            if (input_index < 0) {
                throw new Error("UserInput: Key not found in existing inputs. Key must match an input created with 'generateForm()'.");
            }
            inputs[input_index] = Object.assign({}, inputs[input_index], updated_config);
            mounted_forms.forEach((form) => {
                form.setConfig(inputs[input_index]);
            });
        }
    };
}

//# sourceMappingURL=formGenerator.js.map