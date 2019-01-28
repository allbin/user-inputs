import * as React from 'react';
import styled from 'styled-components';

// this.props has everything passed in to config.props as well as the full config object in this.props.config.

export interface TextareaInputConfig {
    type: "textarea";
    key: string;
    default_value: string;
    label?: string;
    rows?: number;
    placeholder?: string;
    class_name?: string;
    trim?: boolean;
    onChange?: (value: string) => void;
    message?: string;
    tooltip?: string;
}
export interface TextareaInputProps {
    value: string;
    config: TextareaInputConfig;
    onChange: (value: string) => void;
    autofocus?: boolean;
}

let default_config = {
    rows: 3
};

const TextareaInputContainer = styled.div `
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
    textarea {
        border: 2px solid ${props => props.theme.colors.gray[2]};
        border-radius: 4px;
        font-size: 16px;
        padding: 8px 12px;
        width: 100%;
        &:HOVER, &:FOCUS {
            border-color: ${props => props.theme.colors.brand[2]};
        }
    }
`;

class TextareaInput extends React.Component<TextareaInputProps, TextareaInputConfig> {

    onChange(value: string) {
        const cfg = this.props.config;
        this.props.onChange(value);
        if (cfg.onChange) {
            if (cfg.trim) {
                cfg.onChange(value.trim());
            } else {
                cfg.onChange(value);
            }
        }
    }

    render() {
        let cfg = Object.assign({}, default_config, this.props.config);
        let class_names = "user_input textarea_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        return (
            <TextareaInputContainer className={class_names}>
                { cfg.label ? <p>{ cfg.label }</p> : null }
                { cfg.message ? <p className="message">{ cfg.message }</p> : null }
                <textarea
                    rows={cfg.rows || 3}
                    autoFocus={this.props.autofocus || false}
                    placeholder={cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '' }
                    value={this.props.value}
                    onChange={e => this.onChange(e.target.value)}>
                </textarea>
            </TextareaInputContainer>
        );
    }
}

export default TextareaInput;
