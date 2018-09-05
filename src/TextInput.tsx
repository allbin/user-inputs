import * as React from 'react';
import styled from 'styled-components';

export interface TextInputConfig {
    label: string;
}
export interface TextInputProps {
    value: string;
    config: TextInputConfig;
    onChange: (string) => void;
}

class TextInput extends React.Component<TextInputProps, TextInputConfig> {
    container: typeof React.Component;

    constructor(props) {
        super(props);

        this.container = styled.div `
            text-align: left;
            p{
                color: ${props => props.theme.colors.dark[1]};
                font-size: 14px;
                margin-bottom: 12px;
                font-weight: bold;
            }
            input{
                border: 2px solid ${props => props.theme.colors.gray[2]};
                border-radius: 4px;
                font-size: 16px;
                padding: 8px 12px;
                width: 100%;
                transition: all 0.3s;
                &:HOVER, &:FOCUS{
                    border-color: ${props => props.theme.colors.brand[2]};
                }
            }
        `;

    }

    render() {
        let cfg = this.props.config;
        return (
            <this.container className="user_input text_input">
                { cfg.label ? <p>{ cfg.label }</p> : null }
                <input
                    autoFocus={true}
                    type="text"
                    value={this.props.value}
                    onChange={e => this.props.onChange(e.target.value)}
                />
            </this.container>
        );
    }
}

export default TextInput;
