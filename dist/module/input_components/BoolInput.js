import * as React from 'react';
import styled from '../styling';
const BoolInputContainer = styled("div") `
    text-align: left;
    margin-bottom: ${props => props.theme.components.form.user_input.margin_bottom}px;
    p, .bool_block, .bool_input{
        vertical-align: middle;
        display: inline-block;
    }
    p{
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        font-weight: bold;
        width: 60%;
        overflow: hidden;
    }
    p.message{
        color: ${props => props.theme.colors.dark[2]};
        font-size: 12px;
        margin-bottom: 6px;
        font-weight: normal;
        font-style: italic;
    }
    .bool_block{
        width: 40%;
        text-align: right;
    }
    .bool_input{
        cursor: pointer;
        border-radius: 100px;
        width: 60px;
        height: ${props => props.thing_size}px;
        position: relative;
        border: 1px solid ${props => props.theme.colors.border};
        background-color: ${props => props.theme.colors.border};
        box-sizing: content-box;
        transition: all 0.3s;
        &:HOVER{
            border-color: ${props => props.theme.colors.brand[2]};
            .bool_input_thing{
                //background-color: ${props => props.theme.colors.dark[2]};
            }
            &.active{
                .bool_input_thing{
                    //background-color: ${props => props.theme.colors.brand[2]};
                }
            }
        }
        &.active{
            background-color: ${props => props.theme.colors.brand[1]};
            .bool_input_thing{
                //background-color: ${props => props.theme.colors.brand[1]};
                left: ${props => props.thing_size}px;
                top: 0;
            }
        }
        .bool_input_thing{
            transition: all 0.4s;
            position: absolute;
            left: 0;
            top: 0;
            background-color: #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,0.5);
            border-radius: 50%;
            width: ${props => props.thing_size}px;
            height: ${props => props.thing_size}px;
        }
    }
`;
export class Input extends React.Component {
    onChange(value) {
        const cfg = this.props.config;
        this.props.onChange(value, () => {
            let ext_value = convertInternalToExternalValue(cfg, value);
            if (cfg.onValueChange) {
                cfg.onValueChange(ext_value);
            }
        });
    }
    render() {
        let cfg = this.props.config;
        let class_names = "user_input bool_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        const validation_error = validate(cfg, this.props.value);
        return (React.createElement(BoolInputContainer, { className: class_names, thing_size: 30, valid: !validation_error || !this.props.display_error_message },
            cfg.label ? React.createElement("p", null, cfg.label) : null,
            cfg.message ? React.createElement("p", { className: "message" }, cfg.message) : null,
            validation_error && this.props.display_error_message && validation_error.length > 0 ? React.createElement("p", { className: "validation_error" }, validation_error) : null,
            React.createElement("div", { className: "bool_block" },
                React.createElement("div", { className: `bool_input ${this.props.value === true ? 'active' : ''}`, onClick: () => {
                        this.onChange(!this.props.value);
                    } },
                    React.createElement("div", { className: "bool_input_thing" })))));
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
        return "UserInput: Invalid default_value for Bool.";
    }
    return null;
}
export function convertInternalToExternalValue(cfg, value) {
    return value;
}
export function convertExternalToInternalValue(cfg, value) {
    return value;
}

//# sourceMappingURL=BoolInput.js.map
