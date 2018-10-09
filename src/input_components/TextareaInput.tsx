import * as React from 'react';
import styled from 'styled-components';

// this.props has everything passed in to config.props as well as the full config object in this.props.config.

export interface TextareaInputConfig {
    label?: string;
    rows?: number;
    placeholder?: string;
}
export interface TextareaInputProps {
    value: string;
    config: TextareaInputConfig;
    onChange: (string) => void;
}

let default_config = {
    rows: 3
};

class TextareaInput extends React.Component<TextareaInputProps, TextareaInputConfig> {
    container: typeof React.Component;

    constructor(props) {
        super(props);

        this.container = styled.div `
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
    }

    render() {
        let cfg = Object.assign({}, default_config, this.props.config);

        return (
            <this.container className="user_input textarea_input">
                { cfg.label ? <p>{ cfg.label }</p> : null }
                <textarea
                    rows={3}
                    placeholder={cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '' }
                    value={this.props.value}
                    onChange={e => this.props.onChange(e.target.value)}>
                </textarea>
            </this.container>
        );
    }
}

export default TextareaInput;
