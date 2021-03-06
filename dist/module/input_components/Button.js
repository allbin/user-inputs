import * as React from 'react';
import styled from '../styling';
const ButtonContainer = styled("button") `
    margin-bottom: ${props => props.theme.components.form.user_input.margin_bottom}px;
    border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.brand[0]};
    border-radius: ${props => props.theme.components.button.radius}px;
    background-color: ${props => props.filled ? props.theme.colors.brand[0] : 'transparent'};
    color: #fff;
    display: flex;
    font-size: ${props => props.theme.sizes.fonts.small}px;
    user-select: none;
    height: ${props => props.theme.components.button.height}px;
    width: 100%;
    cursor: pointer;
    justify-content: center;
    padding: 0 20px;
    font-weight: bold;
    transition: all 0.3s;
    &:HOVER{
        background-color: ${props => props.filled ? props.theme.colors.brand[1] : props.theme.colors.brand[0]};
        border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.brand[0]};
        box-shadow: 0 4px 5px rgba(0,0,0,0.1);
    }
    &.big{
        height: ${props => props.theme.components.button.height * 1.5}px;
    }
    &.disabled{
        pointer-events: none;
        opacity: 0.4;
    }
    &.light{
        background-color: ${props => props.filled ? props.theme.colors.brand[1] : 'transparent'};
        border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.brand[1]};
    }
    &.dark{
        background-color: ${props => props.filled ? props.theme.colors.dark[0] : 'transparent'};
        border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.dark[0]};
        &:HOVER{
            background-color: ${props => props.filled ? props.theme.colors.dark[2] : props.theme.colors.dark[2]};
            border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.dark[2]};
        }
    }
    &.red{
        background-color: ${props => props.filled ? props.theme.colors.red[1] : 'transparent'};
        border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.red[1]};
        &:HOVER{
            background-color: ${props => props.filled ? props.theme.colors.red[3] : props.theme.colors.red[0]};
            border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.red[0]};
        }
    }
    &.green{
        background-color: ${props => props.filled ? props.theme.colors.green[1] : 'transparent'};
        border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.green[1]};
        &:HOVER{
            background-color: ${props => props.filled ? props.theme.colors.green[2] : props.theme.colors.green[2]};
            border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.green[2]};
        }
    }
    &.teal{
        background-color: ${props => props.filled ? props.theme.colors.teal[1] : 'transparent'};
        border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.teal[1]};
        &:HOVER{
            background-color: ${props => props.filled ? props.theme.colors.teal[2] : props.theme.colors.teal[2]};
            border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.teal[2]};
        }
    }
`;
export class Input extends React.Component {
    render() {
        let cfg = this.props.config;
        let class_names = "user_input button_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        let classes = [];
        if (cfg.dark) {
            classes.push('dark');
        }
        if (cfg.light) {
            classes.push('light');
        }
        if (cfg.red) {
            classes.push('red');
        }
        if (cfg.green) {
            classes.push('green');
        }
        if (cfg.teal) {
            classes.push('teal');
        }
        if (cfg.disabled || this.props.disabled) {
            classes.push('disabled');
        }
        if (cfg.big) {
            classes.push('big');
        }
        class_names += " " + classes.join(" ");
        return (React.createElement(ButtonContainer, { onMouseEnter: () => this.props.onMouseEnter ? this.props.onMouseEnter() : null, onMouseLeave: () => this.props.onMouseLeave ? this.props.onMouseLeave() : null, block: (cfg.block) ? true : false, filled: (cfg.filled === false) ? false : true, disabled: this.props.disabled || cfg.disabled || false, autoFocus: cfg.autofocus || false, className: class_names, onClick: () => this.props.onClick() }, cfg.label));
    }
}
export function validate(cfg, value) {
    return null;
}
export function validateConfig(cfg) {
    if (validate(cfg, cfg.default_value)) {
        return "UserInput: Invalid default_value for Button.";
    }
    return null;
}
export function convertInternalToExternalValue(cfg, value) {
    return null;
}
export function convertExternalToInternalValue(cfg, value) {
    return value;
}

//# sourceMappingURL=Button.js.map
