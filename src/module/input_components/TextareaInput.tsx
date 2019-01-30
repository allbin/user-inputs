import * as React from 'react';
import styled from 'styled-components';

export interface TextareaInputConfig {
    type: "textarea";
    key: string;
    default_value: string;
    label?: string;
    rows?: number;
    placeholder?: string;
    class_name?: string;
    trim?: boolean;
    message?: string;
    /** TODO: Implement tooltip */
    tooltip?: string;
    onValueChange?: (value: string) => void;
    validationCB?: (value: string) => null|string;
}
export interface TextareaInputProps {
    value: string;
    config: TextareaInputConfig;
    onChange: (value: string) => void;
    display_error_message: boolean;
    autofocus?: boolean;
}

let default_config = {
    rows: 3
};

interface ContainerStyleProps {
    valid: boolean;
}

const TextareaInputContainer = styled("div")<ContainerStyleProps> `
    text-align: left;
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
        background-color: ${props => !props.valid ? "rgba(255,0,0,0.1)" : "" };
        border: 2px solid ${props => !props.valid ? props.theme.colors.error : props.theme.colors.gray[2]};
        border-radius: 4px;
        font-size: 16px;
        padding: 8px 12px;
        width: 100%;
        &:HOVER, &:FOCUS {
            border-color: ${props => !props.valid ? props.theme.colors.error : props.theme.colors.brand[2]};
        }
    }
`;

export class Input extends React.Component<TextareaInputProps, TextareaInputConfig> {

    onChange(value: string) {
        const cfg = this.props.config;
        this.props.onChange(value);
        if (cfg.onValueChange) {
            if (cfg.trim) {
                cfg.onValueChange(value.trim());
            } else {
                cfg.onValueChange(value);
            }
        }
    }

    render() {
        let cfg = Object.assign({}, default_config, this.props.config);
        let class_names = "user_input textarea_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        const validation_error = validate(cfg, this.props.value);

        return (
            <TextareaInputContainer
                className={class_names}
                valid={!validation_error || !this.props.display_error_message}
            >
                { cfg.label ? <p>{ cfg.label }</p> : null }
                { cfg.message ? <p className="message">{ cfg.message }</p> : null }
                { validation_error && this.props.display_error_message && validation_error.length > 0 ? <p className="validation_error">{ validation_error }</p> : null }
                <textarea
                    rows={cfg.rows}
                    autoFocus={this.props.autofocus || false}
                    placeholder={cfg.placeholder ? cfg.placeholder : ''}
                    value={this.props.value}
                    onChange={e => this.onChange(e.target.value)}
                />
            </TextareaInputContainer>
        );
    }
}

export function validate(cfg: TextareaInputConfig, value: string): null|string {
    if (cfg.validationCB) {
        return cfg.validationCB(value);
    }
    return null;
}

export function validateConfig(cfg: TextareaInputConfig): null|string {

    return null;
}

export function convertInternalToExternalValue(cfg: TextareaInputConfig, value: string): string {
    return value;
}

export function convertExternalToInternalValue(cfg: TextareaInputConfig, value: string|number): string {
    return value.toString();
}