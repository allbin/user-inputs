import * as React from 'react';
import { renderInputs } from '.';
export default class Form extends React.Component {
    constructor(props) {
        super(props);
        let values = {};
        props.input_configs.forEach((input) => {
            if (input.type === "multi_select") {
                let multi_select = input;
                let selected_options = multi_select.options.filter(option => input.default_value.includes(option.value));
                if (selected_options.length !== input.default_value.length) {
                    throw new Error("UserInput: Default values for multiselect not present in options.");
                }
                values[input.key] = selected_options;
            }
            else if (input.type === "select") {
                let select = input;
                let selected_option = select.options.find(option => input.default_value === option.value);
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
                let text_input = input;
                if ((!input.hasOwnProperty("trim") || text_input.trim === true) && typeof values[input.key] === "string") {
                    values[input.key] = values[input.key].trim();
                }
            }
            else if (input.type === "select") {
                values[input.key] = values[input.key].value;
            }
            else if (input.type === "multi_select") {
                values[input.key] = values[input.key].map(option => option.value);
            }
        });
        if (this.props.confirmCB) {
            this.props.confirmCB(values);
        }
    }
    inputValueChangeCB(key, value) {
        let values = Object.assign({}, this.state.values);
        values[key] = value;
        this.setState({
            values: values
        });
    }
    getValues() {
        let values = Object.assign({}, this.state.values);
        this.props.input_configs.forEach((input) => {
            if (input.type === "text" || input.type === "textarea") {
                let text_input = input;
                if ((!input.hasOwnProperty("trim") || text_input.trim === true) && typeof values[input.key] === "string") {
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
    render() {
        return (React.createElement("div", null, renderInputs(this.props.input_configs, this.state.values, (key, value) => { this.inputValueChangeCB(key, value); }, () => { this.userConfirmedCB(); })));
    }
}

//# sourceMappingURL=Form.js.map
