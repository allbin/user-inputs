import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
// this.props has everything passed in to config.props as well as the full config object in this.props.config.

export interface MultiSelectOptions {
    value: any;
    label: string;
}
export interface MultiSelectInputConfig {
    label?: string;
    placeholder?: string;
    options: MultiSelectOptions[];
    class_name: string;
}
export interface MultiSelectInputProps {
    value: string;
    config: MultiSelectInputConfig;
    onChange: (string) => void;
}

class MultiSelectInput extends React.Component<MultiSelectInputProps, MultiSelectInputConfig> {
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
        let class_names = "user_input multi_select_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        return (
            <this.container className={class_names}>
                { cfg.label ? <p className="multi_select_label">{ cfg.label }</p> : null }
                <Select
                    placeholder={cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '' }
                    isMulti={true}
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

export default MultiSelectInput;
