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
    /** Is the multi_select searchable? Default true */
    searchable?: boolean;
    onValueChange?: (value: (string|number)[]) => void;
    message?: string;
    tooltip?: string;
}
export interface MultiSelectInputProps {
    value: MultiSelectOption;
    config: MultiSelectInputConfig;
    onChange: (options: MultiSelectOption[]) => void;
}

const MultiSelectInputContainer = styled("div") `
    text-align: left;
    p.message{
        color: ${props => props.theme.colors.dark[2]};
        font-size: 12px;
        margin-bottom: 6px;
        font-weight: normal;
        font-style: italic;
    }
    p.multi_select_label {
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: bold;
    }
`;

export class Input extends React.Component<MultiSelectInputProps> {

    onChange(values: MultiSelectOption[]) {
        const cfg = this.props.config;
        this.props.onChange(values);
        if (cfg.onValueChange) {
            cfg.onValueChange(getParsedValue(cfg, values));
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
                { cfg.message ? <p className="message">{ cfg.message }</p> : null }
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

export function validate(cfg: MultiSelectInputConfig, value: (number|string)[]): null|string {
    return null;
}

export function validateConfig(cfg: MultiSelectInputConfig): true|string {
    if (validate(cfg, cfg.default_value)) {
        return "UserInput: Invalid default_value for MultiSelect.";
    }

    return true;
}

export function getParsedValue(cfg: MultiSelectInputConfig, values: MultiSelectOption[]): (string|number)[] {
    return values.map(x => x.value);
}