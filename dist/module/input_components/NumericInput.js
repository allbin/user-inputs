import * as React from 'react';
import oh from 'output-helpers';
import styled from '../styling';
const NumericInputContainer = styled("div") `
    text-align: left;
    margin-bottom: ${props => props.theme.components.form.user_input.margin_bottom}px;
    p{
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 8px;
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
    input{
        background-color: ${props => !props.valid ? "rgba(255,0,0,0.1)" : ""};
        border: 1px solid ${props => !props.valid ? props.theme.colors.error : props.theme.colors.border};
        border-radius: 4px;
        font-size: 16px;
        padding: 8px 12px;
        width: 100%;
        transition: all 0.3s;
        &:HOVER, &:FOCUS{
            border-color: ${props => !props.valid ? props.theme.colors.error : props.theme.colors.brand[2]};
        }
        &.small{
            width: calc(100% - 80px);
            display: inline-block;
            vertical-align: middle;
        }
    }
`;
export class Input extends React.Component {
    onChange(value) {
        const cfg = this.props.config;
        this.props.onChange(value, () => {
            if (cfg.onValueChange && !validate(cfg, value)) {
                cfg.onValueChange(convertInternalToExternalValue(cfg, value));
            }
        });
    }
    render() {
        let cfg = this.props.config;
        let class_names = "user_input numeric_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        const validation_error = validate(cfg, this.props.value);
        return (React.createElement(NumericInputContainer, { className: class_names, valid: !validation_error || !this.props.display_error_message },
            cfg.label ? React.createElement("p", null, cfg.label) : null,
            cfg.message ? React.createElement("p", { className: "message" }, cfg.message) : null,
            validation_error && this.props.display_error_message && validation_error.length > 0 ? React.createElement("p", { className: "validation_error" }, validation_error) : null,
            React.createElement("input", { type: "text", autoFocus: this.props.autofocus || false, value: this.props.value, onChange: e => this.onChange(e.target.value) })));
    }
}
export function validate(cfg, value) {
    if (cfg.validationCB) {
        return cfg.validationCB(value);
    }
    let messages = [];
    if (cfg.number_type === "integer") {
        let parsed = parseInt(value, 10);
        if (!Number.isNaN(parsed) && Number.isFinite(parsed) && Number.isSafeInteger(parsed) && parsed.toString() === value.toString().trim()) {
            if (typeof cfg.max === "number") {
                if (parsed > cfg.max) {
                    messages.push(oh.translate("user_input_value_greater_than_allowed") + ". " + oh.translate("user_input_maximum") + ": " + cfg.max + ".");
                }
            }
            if (typeof cfg.min === "number") {
                if (parsed < cfg.min) {
                    messages.push(oh.translate("user_input_value_less_than_allowed") + ". " + oh.translate("user_input_minimum") + ": " + cfg.min + ".");
                }
            }
            if (messages.length > 0) {
                return messages.join(' ');
            }
            return null;
        }
        return oh.translate("user_input_invalid_integer");
    }
    let parsed = parseFloat(value);
    if (!Number.isNaN(parsed) && Number.isFinite(parsed) && parsed.toString() === value.toString().trim()) {
        if (typeof cfg.max === "number") {
            if (parsed > cfg.max) {
                messages.push(oh.translate("user_input_value_greater_than_allowed") + ". " + oh.translate("user_input_maximum") + ": " + cfg.max + ".");
            }
        }
        if (typeof cfg.min === "number") {
            if (parsed < cfg.min) {
                messages.push(oh.translate("user_input_value_less_than_allowed") + ". " + oh.translate("user_input_minimum") + ": " + cfg.min + ".");
            }
        }
        if (messages.length > 0) {
            return messages.join(' ');
        }
        return null;
    }
    return oh.translate("user_input_invalid_float");
}
export function validateConfig(cfg) {
    if (cfg.number_type !== "integer" && cfg.number_type !== "float") {
        return "UserInput: Numeric input config 'number_type' must be 'float' or 'integer'.";
    }
    return null;
}
export function convertInternalToExternalValue(cfg, value) {
    if (cfg.number_type === "integer") {
        let parsed = parseInt(value, 10);
        if (!Number.isNaN(parsed) && Number.isFinite(parsed) && Number.isSafeInteger(parsed) && parsed.toString(10) === value.trim()) {
            return parsed;
        }
        return cfg.default_value;
    }
    let parsed = parseFloat(value);
    if (!Number.isNaN(parsed) && Number.isFinite(parsed) && parsed.toString() === value.trim()) {
        return parsed;
    }
    return cfg.default_value;
}
export function convertExternalToInternalValue(cfg, value) {
    return value.toString();
}

//# sourceMappingURL=NumericInput.js.map
