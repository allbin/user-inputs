import * as React from 'react';
import styled from '../styling';
export interface ButtonConfig {
    type: "button"|"confirm";
    key: string;
    label: string;
    default_value: any;
    class_name?: string;
    big?: boolean;
    /** Should the buttons background color be filled in or transparent? Default true. */
    filled?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    onValueChange?: () => void;
    dark?: boolean;
    light?: boolean;
    red?: boolean;
    green?: boolean;
    teal?: boolean;
    block?: boolean;
    autofocus?: boolean;
}
export interface ButtonProps {
    config: ButtonConfig;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick: () => void;
    disabled: boolean;
}
interface ContainerStyleProps {
    filled: boolean;
    block: boolean;
}

const ButtonContainer = styled("button")<ContainerStyleProps> `
    font-size: 14px;
    user-select: none;
    border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.brand[0]};
    display: ${props => props.block ? 'block' : 'inline-block'};
    width: ${props => props.block ? '100%' : 'unset'};
    cursor: pointer;
    border-radius: 200px;
    background-color: ${props => props.filled ? props.theme.colors.brand[0] : 'transparent'};
    color: #fff;
    text-align: center;
    padding: 12px 20px;
    font-weight: bold;
    transition: all 0.3s;
    &.big{
        padding: 20px 44px;
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
    &:HOVER{
        background-color: ${props => props.filled ? props.theme.colors.brand[2] : props.theme.colors.brand[0]};
        border: ${props => props.filled ? 'none' : '1px solid ' + props.theme.colors.brand[0]};
        box-shadow: 0 4px 5px rgba(0,0,0,0.1);
    }
`;


export class Input extends React.Component<ButtonProps, any> {

    render() {
        let cfg = this.props.config;
        let class_names = "user_input button_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        let classes = [];
        if (cfg.dark) { classes.push('dark'); }
        if (cfg.light) { classes.push('light'); }
        if (cfg.red) { classes.push('red'); }
        if (cfg.green) { classes.push('green'); }
        if (cfg.teal) { classes.push('teal'); }
        if (cfg.disabled || this.props.disabled) { classes.push('disabled'); }
        if (cfg.big) { classes.push('big'); }
        class_names += " " + classes.join(" ");

        return (
            <ButtonContainer
                onMouseEnter={() => this.props.onMouseEnter ? this.props.onMouseEnter() : null}
                onMouseLeave={() => this.props.onMouseLeave ? this.props.onMouseLeave() : null}
                block={(cfg.block) ? true : false}
                filled={(cfg.filled === false) ? false : true}
                disabled={this.props.disabled || cfg.disabled || false}
                autoFocus={cfg.autofocus || false}
                className={class_names}
                onClick={() => this.props.onClick()}
            >
                {cfg.label}
            </ButtonContainer>
        );
    }
}

export function validate(cfg: ButtonConfig, value: any): null|string {
    return null;
}

export function validateConfig(cfg: ButtonConfig): null|string {
    if (validate(cfg, cfg.default_value)) {
        return "UserInput: Invalid default_value for Button.";
    }

    return null;
}

export function getParsedValue(cfg: ButtonConfig, value: any): any {
    return null;
}