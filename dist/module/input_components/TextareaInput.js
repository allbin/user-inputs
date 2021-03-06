import * as React from 'react';
import styled from 'styled-components';
let default_config = {
    rows: 3
};
const TextareaInputContainer = styled("div") `
    text-align: left;
    margin-bottom: ${props => props.theme.components.form.user_input.margin_bottom}px;
    p {
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: bold;
    }
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
    textarea {
        background-color: ${props => !props.valid ? "rgba(255,0,0,0.1)" : ""};
        border: 1px solid ${props => !props.valid ? props.theme.colors.error : props.theme.colors.border};
        border-radius: 4px;
        font-size: 16px;
        padding: 8px 12px;
        width: 100%;
        &:HOVER, &:FOCUS {
            border-color: ${props => !props.valid ? props.theme.colors.error : props.theme.colors.brand[2]};
        }
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
        let cfg = Object.assign({}, default_config, this.props.config);
        let class_names = "user_input textarea_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        const validation_error = validate(cfg, this.props.value);
        return (React.createElement(TextareaInputContainer, { className: class_names, valid: !validation_error || !this.props.display_error_message },
            cfg.label ? React.createElement("p", null, cfg.label) : null,
            cfg.message ? React.createElement("p", { className: "message" }, cfg.message) : null,
            validation_error && this.props.display_error_message && validation_error.length > 0 ? React.createElement("p", { className: "validation_error" }, validation_error) : null,
            React.createElement("textarea", { rows: cfg.rows, autoFocus: this.props.autofocus || false, placeholder: cfg.placeholder ? cfg.placeholder : '', value: this.props.value, onChange: e => this.onChange(e.target.value) })));
    }
}
export function validate(cfg, value) {
    if (cfg.validationCB) {
        return cfg.validationCB(value);
    }
    return null;
}
export function validateConfig(cfg) {
    return null;
}
export function convertInternalToExternalValue(cfg, value) {
    if (cfg.trim) {
        return value.trim();
    }
    return value;
}
export function convertExternalToInternalValue(cfg, value) {
    return value.toString();
}

//# sourceMappingURL=TextareaInput.js.map
