import * as React from 'react';
import styled from '../styling';
import Select from 'react-select';

export interface MultiSelectInputConfig {
    type: "multi_select";
    key: string;
    default_value: (string|number)[];
    label?: string;
    placeholder?: string;
    options: MultiSelectOption[];
    class_name?: string;
    no_options_message?: string;
    disabled?: boolean;
    searchable?: boolean;
    onChange?: (value: (string|number)[]) => void;
}
export interface MultiSelectInputProps {
    value: MultiSelectOption;
    config: MultiSelectInputConfig;
    onChange: (options: MultiSelectOption[]) => void;
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

    onChange(values: MultiSelectOption[]) {
        const cfg = this.props.config;
        this.props.onChange(values);
        if (cfg.onChange) {
            cfg.onChange(values.map(x => x.value));
        }
    }

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
                        this.onChange(e as MultiSelectOption[]);
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
