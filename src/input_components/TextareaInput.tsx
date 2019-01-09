import * as React from 'react';
import styled from 'styled-components';

// this.props has everything passed in to config.props as well as the full config object in this.props.config.

export interface TextareaInputConfig {
    label?: string;
    rows?: number;
    placeholder?: string;
    class_name?: string;
}
export interface TextareaInputProps {
    value: string;
    config: TextareaInputConfig;
    onChange: (string) => void;
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
    render() {
        let cfg = Object.assign({}, default_config, this.props.config);
        let class_names = "user_input textarea_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        return (
            <TextareaInputContainer className={class_names}>
                { cfg.label ? <p>{ cfg.label }</p> : null }
                <textarea
                    rows={3}
                    autoFocus={this.props.autofocus || false}
                    placeholder={cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '' }
                    value={this.props.value}
                    onChange={e => this.props.onChange(e.target.value)}>
                </textarea>
            </TextareaInputContainer>
        );
    }
}

export default TextareaInput;
