import * as React from 'react';
import styled from '../styling';
import Select from 'react-select';
import { MultiSelectOption } from '../.';

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
    message?: string;
    /** TODO: Implement tooltip */
    tooltip?: string;
    onValueChange?: (value: (string|number)[]) => void;
    validationCB?: (value: (string|number)[]) => null|string;
}
export interface MultiSelectInputProps {
    value: MultiSelectOption[];
    config: MultiSelectInputConfig;
    onChange: (options: MultiSelectOption[], cb: () => void) => void;
    display_error_message: boolean;
}

interface ContainerStyleProps {
    valid: boolean;
}

const MultiSelectInputContainer = styled("div")<ContainerStyleProps> `
    text-align: left;
    p.message{
        color: ${props => props.theme.colors.dark[2]};
        font-size: 12px;
        margin-bottom: 6px;
        font-weight: normal;
        font-style: italic;
    }
    p.validation_error{
        color: ${props => props.theme.colors.red[0]};
        font-size: 14px;
        margin-bottom: 4px;
        font-weight: bold;
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
        this.props.onChange(values, () => {
            let ext_value = convertInternalToExternalValue(cfg, values);
            if (cfg.onValueChange && !validate(cfg, ext_value)) {
                cfg.onValueChange(ext_value);
            }
        });
    }

    render() {
        let cfg = this.props.config;
        let class_names = "user_input multi_select_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        const validation_error = validate(cfg, this.props.value.map(option => option.value));

        return (
            <MultiSelectInputContainer
                className={class_names}
                valid={!validation_error || !this.props.display_error_message}
            >
                { cfg.label ? <p className="multi_select_label">{ cfg.label }</p> : null }
                { cfg.message ? <p className="message">{ cfg.message }</p> : null }
                { validation_error && this.props.display_error_message && validation_error.length > 0 ? <p className="validation_error">{ validation_error }</p> : null }
                <Select
                    placeholder={cfg.placeholder ? cfg.placeholder : ''}
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
    if (cfg.validationCB) {
        return cfg.validationCB(value);
    }
    return null;
}

export function validateConfig(cfg: MultiSelectInputConfig): null|string {
    return null;
}

export function convertInternalToExternalValue(cfg: MultiSelectInputConfig, values: MultiSelectOption[]): (string|number)[] {
    return values.map(x => x.value);
}

export function convertExternalToInternalValue(cfg: MultiSelectInputConfig, values: (number|string)[]): MultiSelectOption[] {
    let selected_options = cfg.options.filter(option => values.includes(option.value));
    if (selected_options.length !== values.length) {
        throw new Error("UserInput: Default value for multiselect not present in options.");
    }
    return selected_options;
}