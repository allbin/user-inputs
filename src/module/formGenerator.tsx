import * as React from 'react';

import { FormState, FormInputConfigArray, AnyInputConfig, AnyInputConfigWithValue, ComponentObject } from '.';

export interface GeneratedForm {
    component: typeof React.Component;
    reset: () => void;
    getValues: () => LooseObject;
    setInputConfig: (updated_config: Partial<AnyInputConfig>) => void;
}

export default function getInputForm(default_components: ComponentObject, input_configs: FormInputConfigArray, cb?: (values: any) => void): GeneratedForm {
    let mounted_form: InputWrapper | null;

    class InputWrapper extends React.Component<any, FormState> {
        confirmCB: ((values: any) => void) | null;

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
                tag: null,
            };
            this.confirmCB = cb || null;
        }

        componentDidMount() {
            mounted_form = this;
        }

        componentWillUnmount() {
            if (mounted_form === this) {
                //If another instance of this form has already been mounted
                //the mounted_form will have changed. Check before resetting it.
                mounted_form = null;
            }
        }

        setConfig(input_config: AnyInputConfigWithValue) {
            let inputs = this.state.inputs;
            let input_index = inputs.findIndex(input => input.key === input_config.key);
            if (input_index < 0) {
                throw new Error("UserInput: Key not found in existing inputs.");
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
            let values: LooseObject = {};
            this.state.inputs.forEach((input) => {
                if (input.type === "button" || input.type === "confirm") {
                    return;
                } else if ((input.type === "text" || input.type === "textarea") && (!input.hasOwnProperty("trim") || input.trim === true)) {
                    if (typeof this.state.values[input.key] === "string") {
                        values[input.key] = this.state.values[input.key].trim();
                    } else {
                        values[input.key] = this.state.values[input.key];
                    }
                } else if (input.type === "select") {
                    values[input.key] = this.state.values[input.key].value;
                } else if (input.type === "multi_select") {
                    values[input.key] = this.state.values[input.key].map((option: MultiSelectOption) => option.value);
                } else {
                    values[input.key] = this.state.values[input.key];
                }
            });
            return values;
        }

        resetValues() {
            let default_values = input_configs.map(input => input.default_value);
            this.setState({ values: default_values });
        }

        userConfirmedCB() {
            if (this.confirmCB) {
                this.confirmCB(this.getValues());
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
                let InputComponent = default_components[input_request.type].Input as typeof React.Component;
                let key = input_request.key || "input_" + index;
                if (input_request.type === "confirm" || input_request.type === "button") {
                    return <InputComponent
                        key={key}
                        config={input_request}
                        value={this.state.values[key]}
                        onClick={() => {
                            if (input_request.type === "confirm") {
                                this.userConfirmedCB();
                            } else {
                                if (input_request.onClick) {
                                    input_request.onClick();
                                }
                            }
                        }}
                    />;
                }
                return <InputComponent
                    key={key}
                    config={input_request}
                    value={this.state.values[key]}
                    onChange={(value: any) => {
                        this.inputValueChangeCB(key, value);
                    }}
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
            if (mounted_form) {
                mounted_form.resetValues();
            }
        },
        getValues: (): LooseObject => {
            if (!mounted_form) {
                return {};
            }
            return mounted_form.getValues();
        },
        setInputConfig: (updated_config: Partial<AnyInputConfigWithValue>) => {
            if (updated_config.hasOwnProperty("key") === false) {
                throw new Error("UserInput: input_config must contain 'key' property.");
            }
            let inputs = input_configs;
            let input_index = input_configs.findIndex(input => input.key === updated_config.key);
            if (input_index < 0) {
                throw new Error("UserInput: Key not found in existing inputs.");
            }
            input_configs[input_index] = Object.assign({}, input_configs[input_index], updated_config);
            if (mounted_form) {
                mounted_form.setConfig(inputs[input_index]);
            }
        }
    };
}