import * as React from 'react';
import oh from 'output-helpers';
import translations from './translations';


import PromptModal from './PromptModal';
import TextInput from './TextInput';
import BoolInput from './BoolInput';
import GridInput from './GridInput';

export type InputType = "bool" | "button" | "date" | "grid" | "number" | "select" | "text";
export interface InputConfig {
    [key: string]: any;
    default_value: any;
    type: InputType;
    onChange: (any) => void;
}
export interface PromptRequest {
    inputs: InputConfig[];
    props?: object;
}
export interface PromptState {
    show?: boolean;
    modal_props?: any;
    values?: any[];
    inputs?: any[];
}
export interface ComponentObject {
    bool?: typeof React.Component;
    button?: typeof React.Component;
    date?: typeof React.Component;
    grid?: typeof React.Component;
    number?: typeof React.Component;
    select?: typeof React.Component;
    text?: typeof React.Component;
    modal?: typeof React.Component;
}

//Add the translations of this repo to OH. Prefix: "user_input_hoc_".
oh.addDictionary(translations);




let custom_components: ComponentObject = {};





function getInputComponents(input_components: ComponentObject, inputs: InputConfig[], values: any[], changeCB: (number, any) => void): JSX.Element[] {
    return inputs.map((input_request, index) => {
        let InputComponent = input_components[input_request.type];
        if (custom_components && custom_components.hasOwnProperty(input_request.type)) {
            InputComponent = custom_components[input_request.type];
        }

        return <InputComponent
            key={index}
            request={input_request}
            value={values[index]}
            onChange={(value) => {
                if (input_request.onChange) {
                    input_request.onChange(value);
                }
                changeCB(index, value);
            }}
        />;
    });
}




function getComponentWithInputs(input_configs: InputConfig[], cb): typeof React.Component {
    class InputWrapper extends React.Component<any, PromptState> {
        confirmCB: (any) => void | null;
        input_components: ComponentObject;

        constructor(props) {
            super(props);

            this.state = {
                values: input_configs.map(input => input.default_value),
                inputs: input_configs
            };
            this.confirmCB = cb || null;

            this.input_components = {
                text: TextInput,
                grid: GridInput,
                bool: BoolInput
            };
        }

        userConfirmedCB() {
            this.setState({
                show: false
            });
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
                return <InputComponent
                    key={index}
                    request={input_request}
                    value={this.state.values[index]}
                    onChange={(value) => {
                        if (input_request.onChange) {
                            input_request.onChange(value);
                        }
                        this.inputValueChangeCB(index, value);
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

    return InputWrapper;
}







export function InputHOC (
    WrappedComponent: typeof React.Component
): typeof React.Component {
    class Prompt extends React.Component<any, PromptState> {
        exports: {
            prompt: (prompt_request: PromptRequest, confirmCB: (any) => void, cancelCB: () => void) => void;
            cancel: () => void;
        };
        confirmCB: any;
        cancelCB: any;
        input_components: ComponentObject;

        constructor(props) {
            super(props);

            this.state = {
                show: false,
                modal_props: {},
                values: []
            };
            this.exports = {
                prompt: (prompt_request, confirmCB, cancelCB) => {
                    this.initPrompt(prompt_request.inputs, prompt_request.props, confirmCB, cancelCB);
                },
                cancel: () => {
                    this.cancelRequest();
                }
            };
            this.confirmCB = null;
            this.cancelCB = null;

            this.input_components = {
                text: TextInput,
                grid: GridInput,
                bool: BoolInput
            };
        }

        initPrompt(inputs: InputConfig[], props?: object, confirmCB?: (any) => void, cancelCB?: () => void) {
            let sanitized_inputs = inputs.filter(input => input.type !== "button");
            if (sanitized_inputs.length !== inputs.length) {
                console.warn("UserInput: Invalid input types detected for Prompt.");
            }
            this.confirmCB = confirmCB || null;
            this.cancelCB = cancelCB || null;
            let values = sanitized_inputs.map(input => input.default_value);
            this.setState({
                show: true,
                modal_props: props,
                inputs: inputs,
                values: values
            });
        }

        cancelRequest() {
            this.confirmCB = null;
            this.cancelCB = null;
            this.setState({
                show: false,
                inputs: [],
                values: []
            });
        }

        userConfirmedCB() {
            this.setState({
                show: false
            });
            if (this.confirmCB) {
                this.confirmCB(this.state.values);
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

        inputValueChangeCB(index, value) {
            let all_values = [].concat(this.state.values);
            all_values[index] = value;
            this.setState({
                values: all_values
            });
        }

        renderInputs() {
            if (!this.state.inputs) { return null; }
            return this.state.inputs.map((input_request, index) => {
                let InputComponent = this.input_components[input_request.type];
                if (custom_components && custom_components.hasOwnProperty(input_request.type)) {
                    InputComponent = custom_components[input_request.type];
                }
                return <InputComponent
                    key={index}
                    request={input_request}
                    value={this.state.values[index]}
                    onChange={(value) => {
                        if (input_request.onChange) {
                            input_request.onChange(value);
                        }
                        this.inputValueChangeCB(index, value);
                    }}
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
                <WrappedComponent UserPrompt={this.exports} {...this.props} />
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
    export function generateInputs(input_configs: InputConfig[], confirmCB?: (any) => void) {
        if (input_configs.length < 1) {
            throw new Error("UserInput: GenerateInputs requires at least one input.");
        }
        if (!confirmCB) {
            let inputs_missing_cb = input_configs.filter(input => !input.onChange);
            if (inputs_missing_cb.length > 0) {
                throw new Error("UserInput: GenerateInputs with 'individual_callbacks' property true requires every input to specify a onChange callback.");
            }
        }
        return getComponentWithInputs(input_configs, confirmCB);
    }
}

export default InputHOC;
