import * as React from 'react';
import { LooseObject } from '.';

import { valid_types, input_imports, FormInputConfigArray, AnyInputConfigWithValue, GeneratedForm } from '.';

interface FormState {
    values: {
        [key: string]: any
    };
    inputs: FormInputConfigArray;
    tag: string | null;
    confirm_clicked: boolean;
}

export default function getInputForm(input_configs: FormInputConfigArray, cb?: (values: any) => void): GeneratedForm {
    let mounted_form: InputWrapper | null;

    class InputWrapper extends React.Component<any, FormState> {
        confirmCB: ((values: any) => void) | null;

        constructor(props: any) {
            super(props);

            let values: LooseObject = {};
            input_configs.forEach((input_config) => {
                values[input_config.key] = input_imports[input_config.type].convertExternalToInternalValue(input_config, input_config.default_value);
            });
            this.state = {
                values: values,
                inputs: input_configs,
                tag: null,
                confirm_clicked: (cb) ? false : true
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
                values[input_config.key] = input_imports[input_config.type].convertExternalToInternalValue(input_config, input_config.default_value);
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
                } else {
                    return values[input.key] = input_imports[input.type].convertInternalToExternalValue(input, this.state.values[input.key]);
                }
            });
            return values;
        }

        resetValues() {
            let values: LooseObject = {};
            input_configs.forEach((input_config) => {
                values[input_config.key] = input_imports[input_config.type].convertExternalToInternalValue(input_config, input_config.default_value);
            });
            this.setState({
                values: values,
                confirm_clicked: false
            });
        }

        resetConfirmClick() {
            this.setState({
                confirm_clicked: false
            });
        }

        userConfirmedCB() {
            this.setState({ confirm_clicked: true });
            if (this.confirmCB && this.isValid()) {
                this.confirmCB(this.getValues());
            }
        }

        inputValueChangeCB(key: string, value: any, cb?: () => void) {
            let values = Object.assign({}, this.state.values);
            values[key] = value;
            this.setState({
                values: values
            }, cb);
        }

        isValid() {
            return !this.state.inputs.some((input_config) => {
                let valid_error = input_imports[input_config.type].validate(input_config, this.state.values[input_config.key]);
                return valid_error !== null;
            });
        }

        renderInputs() {
            return this.state.inputs.map((input_request, index) => {
                let InputComponent = input_imports[input_request.type].Input as typeof React.Component;
                let key = input_request.key || "input_" + index;
                if (input_request.type === "confirm") {
                    return <InputComponent
                        key={key}
                        config={input_request}
                        value={this.state.values[key]}
                        onClick={() => { this.userConfirmedCB(); }}
                    />;
                } else if (input_request.type === "button") {
                    return <InputComponent
                        key={key}
                        config={input_request}
                        value={this.state.values[key]}
                        onClick={() => {
                            if (input_request.onClick) {
                                input_request.onClick();
                            }
                        }}
                    />;
                }
                return <InputComponent
                    key={key}
                    config={input_request}
                    value={this.state.values[key]}
                    display_error_message={this.state.confirm_clicked}
                    onChange={(value: any, cb: () => void) => {
                        this.inputValueChangeCB(key, value, cb);
                    }}
                />;
            });
        }

        render() {
            return (
                <div>
                    {this.renderInputs()}
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
        resetConfirmClick: () => {
            if (mounted_form) {
                mounted_form.resetConfirmClick();
            }
        },
        getValues: (): LooseObject => {
            if (!mounted_form) {
                return {};
            }
            return mounted_form.getValues();
        },
        setInputConfig: (updated_config: AnyInputConfigWithValue) => {
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

export function validateFormGeneratorInputs(input_configs: FormInputConfigArray, confirmCB?: (value: any) => void): void {
    if (input_configs.length < 1) {
        throw new Error("UserInput: GenerateForm requires at least one input.");
    }
    if (!confirmCB) {
        let inputs_missing_cb = input_configs.filter(input => !input.onValueChange);
        if (inputs_missing_cb.length > 0) {
            throw new Error("UserInput: GenerateForm without a confirmCB requires every input to specify a onValueChange callback.");
        }
    } else {
        let confirm_buttons = input_configs.some(input => input.type === "confirm");
        if (!confirm_buttons) {
            throw new Error("UserInput: GenerateForm with a confirmCB is required to have at least one input of type 'confirm'.");
        }
    }


    //Check that default_value is set.
    let invalid_inputs = input_configs.some((input) => {
        return (input.type !== "confirm" && input.type !== "button") && input.hasOwnProperty("default_value") === false;
    });
    if (invalid_inputs) {
        throw new Error("UserInput: Every input that is not a 'button' or 'confirm' must be configured with a 'default_value'.");
    }


    //Check that each input has a valid type.
    invalid_inputs = input_configs.some(input => !valid_types.includes(input.type));
    if (invalid_inputs) {
        throw new Error("UserInput: Inputs must be configured with a valid 'type'. " + valid_types.join(','));
    }


    //Check that each input has a key property.
    invalid_inputs = input_configs.some(input => (input.type !== 'button' && input.type !== 'confirm') && !input.hasOwnProperty('key'));
    if (invalid_inputs) {
        throw new Error("UserInput: Inputs that are not type 'button' or 'confirm' must be configured with a 'key' property. ");
    }


    //Duplicate key check.
    let duplicate_keys: Set<string> = new Set();
    invalid_inputs = input_configs.some((input) => {
        if (input.type === 'button' || input.type === 'confirm') {
            return false;
        }
        return duplicate_keys.size === duplicate_keys.add(input.key).size;
    });


    //Run each input type's own validation function.
    let errors: string[] = [];
    input_configs.forEach((input) => {
        let valid = input_imports[input.type].validateConfig(input);
        if (valid) { errors.push(valid); }
    });
    if (errors.length > 0) {
        throw new Error(errors.join('\n'));
    }
}