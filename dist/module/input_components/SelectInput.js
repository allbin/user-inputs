import * as React from 'react';
import styled from '../styling';
import Select from 'react-select';
const SelectInputContainer = styled("div") `
    text-align: left;
    margin-bottom: ${props => props.theme.components.form.user_input.margin_bottom}px;
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
        this.props.onChange(value, () => {
            let ext_value = convertInternalToExternalValue(cfg, value);
            if (cfg.onValueChange && !validate(cfg, ext_value)) {
                cfg.onValueChange(ext_value);
            }
        });
    }
    render() {
        let cfg = this.props.config;
        let class_names = "user_input select_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        const validation_error = validate(cfg, this.props.value.value);
        return (React.createElement(SelectInputContainer, { className: class_names, valid: !validation_error || !this.props.display_error_message },
            cfg.label ? React.createElement("p", { className: "select_label" }, cfg.label) : null,
            cfg.message ? React.createElement("p", { className: "message" }, cfg.message) : null,
            validation_error && this.props.display_error_message && validation_error.length > 0 ? React.createElement("p", { className: "validation_error" }, validation_error) : null,
            React.createElement(Select, { placeholder: cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '', value: this.props.value, onChange: (e) => {
                    this.onChange(e);
                }, isDisabled: cfg.disabled || false, isSearchable: cfg.searchable || false, noOptionsMessage: () => cfg.no_options_message || null, options: cfg.options, styles: cfg.styles })));
    }
}
export function validate(cfg, value) {
    if (cfg.validationCB) {
        return cfg.validationCB(value);
    }
    return null;
}
export function validateConfig(cfg) {
    if (validate(cfg, cfg.default_value)) {
        return "UserInput: Invalid default_value for Select.";
    }
    return null;
}
export function convertInternalToExternalValue(cfg, value) {
    return value.value;
}
export function convertExternalToInternalValue(cfg, value) {
    let selected_option = cfg.options.find(option => value === option.value);
    if (!selected_option) {
        throw new Error("UserInput: Default value for select not present in options.");
    }
    return selected_option;
}

//# sourceMappingURL=SelectInput.js.map
