import * as React from 'react';

export interface GeneratedForm {
    component: typeof React.Component;
    reset: () => void;
    getForms: () => void;
    getValues: () => any[];
    setInputConfig: (updated_config: InputConfig) => void;
}

export function getInputForm(default_components: ComponentObject, custom_components: ComponentObject, input_configs: InputConfig[], cb?: (values: any) => void): GeneratedForm {
    let mounted_forms: InputWrapper[] = [];

    class InputWrapper extends React.Component<any, PromptState> {
        confirmCB: ((values: any) => void) | null;
        input_components: ComponentObject;

        constructor(props: any) {
            super(props);

            let values: { [key: string]: any; } = {};
            input_configs.forEach((input) => {
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

            this.state = {
                values: values,
                inputs: input_configs,
                prompt_request: null,
                tag: null,
                show: true,
                modal_props: {}
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

        setConfig(input_config: InputConfig) {
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
                    values[input.key] = values[input.key].map((option: SelectionsOptions) => option.value);
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
                    values[input.key] = values[input.key].map((option: SelectionsOptions) => option.value);
                }
            });
            if (this.confirmCB) {
                this.confirmCB(values);
                this.confirmCB = null;
            }
        }

        inputValueChangeCB(key: string, value: any) {
            let values = Object.assign({}, this.state.values);
            values[key] = value;
            this.setState({
                values: values
            });
        }

        renderInputs() {
            return this.state.inputs.map((input_request, index) => {
                let InputComponent = this.input_components[input_request.type] as typeof React.Component;
                if (custom_components && custom_components.hasOwnProperty(input_request.type)) {
                    InputComponent = custom_components[input_request.type] as typeof React.Component;
                }
                let input_component_props = input_request.props || {};
                let key = input_request.key || "input_" + index;
                if (input_request.type === "confirm") {
                    return <InputComponent
                        key={key}
                        config={input_request}
                        value={this.state.values[key]}
                        onClick={(value: any) => {
                            this.userConfirmedCB();
                        }}
                        {...input_component_props}
                    />;
                }
                return <InputComponent
                    key={key}
                    config={input_request}
                    value={this.state.values[key]}
                    onChange={(value: any) => {
                        if (input_request.onChange) {
                            input_request.onChange(value);
                        }
                        this.inputValueChangeCB(key, value);
                    }}
                    {...input_component_props}
                />;
            });
        }

        render() {
            return (
                <div>
                    { this.renderInputs() }
                </div>
            );
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
        setInputConfig: (updated_config: InputConfig) => {
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