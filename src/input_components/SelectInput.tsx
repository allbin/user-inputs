import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
// this.props has everything passed in to config.props as well as the full config object in this.props.config.

export interface SelectInputOptions {
    value: any;
    label: string;
}
export interface SelectInputConfig {
    label?: string;
    options: SelectInputOptions[];
    placeholder?: string;
}
export interface SelectInputProps {
    value?: string;
    config: SelectInputConfig;
    onChange: (string) => void;
}

class SelectInput extends React.Component<SelectInputProps, SelectInputConfig> {
    container: typeof React.Component;

    constructor(props) {
        super(props);

        this.container = styled.div `
            text-align: left;
            p.multi_select_label {
                color: ${props => props.theme.colors.dark[1]};
                font-size: 14px;
                margin-bottom: 12px;
                font-weight: bold;
            }
        `;
    }

    render() {
        let cfg = this.props.config;

        return (
            <this.container className="user_input text_input">
                { cfg.label ? <p className="multi_select_label">{ cfg.label }</p> : null }
                <Select
                    placeholder={cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '' }
                    value={this.props.value}
                    onChange={(e) => {
                        this.props.onChange(e);
                    }}
                    options={cfg.options}
                />
            </this.container>
        );
    }
}

export default SelectInput;
