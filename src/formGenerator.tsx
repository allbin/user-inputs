import * as React from 'react';


export function getInputForm(default_components: ComponentObject, custom_components: ComponentObject, input_configs: InputConfig[], cb: (any) => void): any {
    let mounted_forms: InputWrapper[] = [];

    class InputWrapper extends React.Component<any, PromptState> {
        confirmCB: (any) => void | null;
        input_components: ComponentObject;

        constructor(props) {
            super(props);

            let values = {};
            input_configs.forEach(input => values[input.key] = input.default_value);

            this.state = {
                values: values,
                inputs: input_configs
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
                confirm: default_components.button
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
                values[input_config.key] = input_config.value;
            }
            inputs[input_index] = Object.assign({}, inputs[input_index], input_config);
            this.setState({
                inputs: inputs,
                values: values
            });
        }

        getValues() {
            return this.state.values;
        }

        resetValues() {
            let default_values = input_configs.map(input => input.default_value);
            this.setState({ values: default_values });
        }

        userConfirmedCB() {
            if (this.confirmCB) {
                this.confirmCB(this.state.values);
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
                let input_component_props = input_request.props || {};
                let key = input_request.key || "input_" + index;
                if (input_request.type === "confirm") {
                    return <InputComponent
                        key={key}
                        config={input_request}
                        value={this.state.values[key]}
                        onClick={(value) => {
                            this.userConfirmedCB();
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
                form.setConfig(updated_config);
            });
        }
    };
}