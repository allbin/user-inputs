import * as React from 'react';

import { renderInputs } from '.';

import { MultiSelectInputConfig } from './input_components/MultiSelectInput';
import { SelectInputConfig } from './input_components/SelectInput';
import { TextInputConfig } from './input_components/TextInput';
import { TextareaInputConfig } from './input_components/TextareaInput';

interface FormProps {
    confirmCB?: (values: LooseObject) => void;
    input_configs: InputConfig2[];
    refCB?: (form: Form) => void;
}
interface FormState {
    values: LooseObject;
}

export default class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        let values: { [key: string]: any; } = {};
        props.input_configs.forEach((input) => {
            if (input.type === "multi_select") {
                let multi_select = input as InputConfig2 & MultiSelectInputConfig;
                let selected_options = multi_select.options.filter(option => input.default_value.includes(option.value));
                if (selected_options.length !== input.default_value.length) {
                    throw new Error("UserInput: Default values for multiselect not present in options.");
                }
                values[input.key] = selected_options;
            } else if (input.type === "select") {
                let select = input as InputConfig2 & SelectInputConfig;
                let selected_option = select.options.find(option => input.default_value === option.value);
                if (!selected_option) {
                    throw new Error("UserInput: Default value for select not present in options.");
                }
                values[input.key] = selected_option;
            } else {
                values[input.key] = input.default_value;
            }
        });

        this.state = {
            values: {}
        };

        if (props.refCB) {
            props.refCB(this);
        }
    }

    userConfirmedCB() {
        let values = Object.assign({}, this.state.values);
        this.props.input_configs.forEach((input) => {
            if (input.type === "text" || input.type === "textarea") {
                let text_input = (input as TextInputConfig | TextareaInputConfig);
                if ((!input.hasOwnProperty("trim") || text_input.trim === true) && typeof values[input.key] === "string") {
                    values[input.key] = values[input.key].trim();
                }
            }
            if (input.type === "select") {
                values[input.key] = values[input.key].value;
            }
            if (input.type === "multi_select") {
                values[input.key] = (values[input.key] as SelectionsOptions[]).map(option => option.value);
            }
        });
        if (this.props.confirmCB) {
            this.props.confirmCB(values);
        }
    }

    inputValueChangeCB(key: string, value: any) {
        let values = Object.assign({}, this.state.values);
        values[key] = value;
        this.setState({
            values: values
        });
    }

    getValues(): LooseObject {
        let values = Object.assign({}, this.state.values);
        this.props.input_configs.forEach((input) => {
            if (input.type === "text" || input.type === "textarea") {
                let text_input = (input as TextInputConfig | TextareaInputConfig);
                if ((!input.hasOwnProperty("trim") || text_input.trim === true) && typeof values[input.key] === "string") {
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

    render() {
        return (
            <div>
                {
                    renderInputs(
                        this.props.input_configs,
                        this.state.values,
                        (key: string, value: any) => { this.inputValueChangeCB(key, value); },
                        () => { this.userConfirmedCB(); },
                    )
                }
            </div>
        );
    }
}
