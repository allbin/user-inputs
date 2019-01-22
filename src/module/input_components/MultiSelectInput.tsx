import * as React from 'react';
import styled from '../styling/styled';
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
// this.props has everything passed in to config.props as well as the full config object in this.props.config.

export interface MultiSelectOptions {
    value: string;
    label: string;
}

export interface MultiSelectInputConfig {
    label?: string;
    placeholder?: string;
    options: MultiSelectOptions[];
    class_name?: string;
    no_options_message?: string;
    disabled?: boolean;
    searchable?: boolean;
}
export interface MultiSelectInputProps {
    value: MultiSelectOptions;
    config: MultiSelectInputConfig;
    onChange: (options: ValueType<MultiSelectOptions>) => void;
}

const MultiSelectInputContainer = styled("div") `
    text-align: left;
    p.multi_select_label {
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: bold;
    }
`;

class MultiSelectInput extends React.Component<MultiSelectInputProps> {

    render() {
        let cfg = this.props.config;
        let class_names = "user_input multi_select_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        return (
            <MultiSelectInputContainer
                className={class_names}
            >
                { cfg.label ? <p className="multi_select_label">{ cfg.label }</p> : null }
                <Select
                    placeholder={cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '' }
                    isMulti={true}
                    value={this.props.value}
                    onChange={(e) => {
                        this.props.onChange(e);
                    }}
                    isSearchable={cfg.searchable || false}
                    isDisabled={cfg.disabled || false}
                    noOptionsMessage={() => cfg.no_options_message || null}
                    options={cfg.options}
                />
            </MultiSelectInputContainer>
        );
    }
}

export default MultiSelectInput;
