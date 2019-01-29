import * as React from 'react';
import styled from '../styling';
import Select from 'react-select';
const SelectInputContainer = styled("div") `
    text-align: left;
    p.message{
        color: ${props => props.theme.colors.dark[2]};
        font-size: 12px;
        margin-bottom: 6px;
        font-weight: normal;
        font-style: italic;
    }
    p.validation_error{
        color: ${props => props.theme.colors.red[0]};
        font-size: 14px;
        margin-bottom: 4px;
        font-weight: bold;
        font-style: italic;
    }
    p.select_label {
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: bold;
    }
`;
export class Input extends React.Component {
    onChange(value) {
        const cfg = this.props.config;
        this.props.onChange(value);
        if (cfg.onValueChange) {
            cfg.onValueChange(value.value);
        }
    }
    render() {
        let cfg = this.props.config;
        let class_names = "user_input select_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        const validation_error = validate(cfg, this.props.value.value);
        return (React.createElement(SelectInputContainer, { className: class_names, valid: !validation_error },
            cfg.label ? React.createElement("p", { className: "select_label" }, cfg.label) : null,
            cfg.message ? React.createElement("p", { className: "message" }, cfg.message) : null,
            validation_error && validation_error.length > 0 ? React.createElement("p", { className: "validation_error" }, validation_error) : null,
            React.createElement(Select, { placeholder: cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '', value: this.props.value, onChange: (e) => {
                    this.onChange(e);
                }, isDisabled: cfg.disabled || false, isSearchable: cfg.searchable || false, noOptionsMessage: () => cfg.no_options_message || null, options: cfg.options })));
    }
}
export function validate(cfg, value) {
    if (cfg.onValidate) {
        return cfg.onValidate(value);
    }
    return null;
}
export function validateConfig(cfg) {
    if (validate(cfg, cfg.default_value)) {
        return "UserInput: Invalid default_value for Select.";
    }
    return null;
}
export function getParsedValue(cfg, value) {
    return value.value;
}

//# sourceMappingURL=SelectInput.js.map
