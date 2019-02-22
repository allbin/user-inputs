import * as React from 'react';
import styled from 'styled-components';
import { TriStateInputOption } from '../.';

export interface TriStateInputConfig {
    type: "tri_state";
    key: string;
    default_value: string|number;
    label?: string;
    options: TriStateInputOption[];
    placeholder?: string;
    class_name?: string;
    no_options_message?: string;
    searchable?: boolean;
    disabled?: boolean;
    message?: string;
    /** TODO: Implement tooltip */
    tooltip?: string;
    onValueChange?: (value: string|number) => void;
    validationCB?: (value: string|number) => null|string;
}
export interface TriStateInputProps {
    value: string|number;
    config: TriStateInputConfig;
    onChange: (value: string|number, cb: () => void) => void;
    display_error_message: boolean;
}

interface ContainerStyleProps {
    valid: boolean;
}

const TriStateInputContainer = styled("div")<ContainerStyleProps> `
    text-align: left;
    margin-bottom: ${props => props.theme.components.form.user_input.margin_bottom}px;
    p.tri_state_label {
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
    .grid_block{
        background-color: ${props => props.theme.colors.gray[3]};
        text-align: center;
        border-radius: 50px;
        position: relative;
        .grid_block_bg{
            background-color: ${props => props.theme.colors.blue[1]};
            position: absolute;
            border-radius: 50px;
            width: 33%;
            top: 0;
            bottom: 0;
            transition: all 0.4s;
        }
        .grid_item{
            position: relative;
            cursor: pointer;
            padding: 20px 0;
            font-size: 16px;
            display: inline-block;
            width: 33%;
            &.active{
                font-weight: bold;
                color: #fff;
            }
        }
    }
`;

export class Input extends React.Component<TriStateInputProps, TriStateInputConfig> {
    onChange(value: string|number) {
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
        let class_names = "user_input tri_state_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        const LEFT_POSITION = cfg.options.findIndex(option => option.value === this.props.value);

        const validation_error = validate(cfg, this.props.value);

        return (
            <TriStateInputContainer
                className={class_names}
                valid={!validation_error || !this.props.display_error_message}
            >
                { cfg.label ? <p className="tri_state_label">{ cfg.label }</p> : null }
                { cfg.message ? <p className="message">{ cfg.message }</p> : null }
                { validation_error && this.props.display_error_message && validation_error.length > 0 ? <p className="validation_error">{ validation_error }</p> : null }
                <div className="grid_block">
                    <div className="grid_block_bg" style={{left: 33.333333333333 * LEFT_POSITION + '%'}}></div>
                    {
                        cfg.options.map((item, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`grid_item ${this.props.value === item.value ? 'active' : ''}`}
                                    onClick={() => {
                                        this.onChange(item.value);
                                    }}
                                    >
                                    <span>{item.label}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </TriStateInputContainer>
        );
    }
}

export function validate(cfg: TriStateInputConfig, value: string|number): null|string {
    if (cfg.validationCB) {
        return cfg.validationCB(value);
    }
    return null;
}

export function validateConfig(cfg: TriStateInputConfig): null|string {
    if (validate(cfg, cfg.default_value)) {
        return "UserInput: Invalid default_value for TriState.";
    }

    return null;
}

export function convertInternalToExternalValue(cfg: TriStateInputConfig, value: string|number): string|number {
    return value;
}

export function convertExternalToInternalValue(cfg: TriStateInputConfig, value: string|number): string|number {
    return value;
}
