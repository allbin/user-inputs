import * as React from 'react';
import styled from '../styling/styled';
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
    class_name?: string;
    no_options_message?: string;
    searchable?: boolean;
    disabled?: boolean;
}
export interface SelectInputProps {
    value?: string;
    config: SelectInputConfig;
    onChange: (string) => void;
}

const SelectInputContainer = styled.div `
    text-align: left;
    p.multi_select_label {
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: bold;
    }
`;

class SelectInput extends React.Component<SelectInputProps, SelectInputConfig> {
    render() {
        let cfg = this.props.config;
        let class_names = "user_input select_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        return (
            <SelectInputContainer className={class_names}>
                { cfg.label ? <p className="multi_select_label">{ cfg.label }</p> : null }
                <Select
                    placeholder={cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '' }
                    value={this.props.value}
                    onChange={(e) => {
                        this.props.onChange(e);
                    }}
                    isDisabled={cfg.disabled || false}
                    isSearchable={cfg.searchable || false}
                    noOptionsMessage={() => cfg.no_options_message || null}
                    options={cfg.options}
                />
            </SelectInputContainer>
        );
    }
}

export default SelectInput;
