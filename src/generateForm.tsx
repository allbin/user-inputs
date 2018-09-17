import * as React from 'react';


export function getInputForm(default_components: ComponentObject, custom_components: ComponentObject, input_configs: InputConfig[], cb: (any) => void): any {
    let mounted_component: InputWrapper;

    class InputWrapper extends React.Component<any, PromptState> {
        confirmCB: (any) => void | null;
        input_components: ComponentObject;

        constructor(props) {
            super(props);
            mounted_component = this;
            this.state = {
                values: input_configs.map(input => input.default_value),
                inputs: input_configs
            };
            this.confirmCB = cb || null;

            this.input_components = {
                text: default_components.text,
                grid: default_components.grid,
                bool: default_components.bool,
                button: default_components.button,
                confirm: default_components.button
            };
        }

        // componentDidMount() {
        //     mounted_component = this;
        // }

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

        inputValueChangeCB(index, value) {
            let all_values = [].concat(this.state.values);
            all_values[index] = value;
            this.setState({
                values: all_values
            });
        }

        renderInputs() {
            return this.state.inputs.map((input_request, index) => {
                let InputComponent = this.input_components[input_request.type];
                if (custom_components && custom_components.hasOwnProperty(input_request.type)) {
                    InputComponent = custom_components[input_request.type];
                }
                let input_component_props = input_request.props || {};
                if (input_request.type === "confirm") {
                    return <InputComponent
                        key={index}
                        config={input_request}
                        value={this.state.values[index]}
                        onClick={(value) => {
                            this.userConfirmedCB();
                        }}
                        {...input_component_props}
                    />;
                }
                return <InputComponent
                    key={index}
                    config={input_request}
                    value={this.state.values[index]}
                    onChange={(value) => {
                        if (input_request.onChange) {
                            input_request.onChange(value);
                        }
                        this.inputValueChangeCB(index, value);
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
            if (!mounted_component) {
                console.error("Cannot reset form before it has been mounted.");
                return;
            }
            mounted_component.resetValues();
        },
        getValues: () => {
            if (!mounted_component) {
                console.error("Cannot getValues from form before it has been mounted.");
                return;
            }
            mounted_component.getValues();
        },
        setValues: (new_values: object) => {
            Object.keys(new_values).forEach((key) => {
                //WORK HERE!
            });
        }
    };
}