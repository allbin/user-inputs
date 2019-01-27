import * as React from 'react';
import styled from '../styling';
import Select from 'react-select';
const SelectInputContainer = styled.div `
    text-align: left;
    p.multi_select_label {
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: bold;
    }
`;
class SelectInput extends React.Component {
    onChange(value) {
        const cfg = this.props.config;
        this.props.onChange(value);
        if (cfg.onChange) {
            cfg.onChange(value.value);
        }
    }
    render() {
        let cfg = this.props.config;
        let class_names = "user_input select_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        return (React.createElement(SelectInputContainer, { className: class_names },
            cfg.label ? React.createElement("p", { className: "multi_select_label" }, cfg.label) : null,
            React.createElement(Select, { placeholder: cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '', value: this.props.value, onChange: (e) => {
                    this.onChange(e);
                }, isDisabled: cfg.disabled || false, isSearchable: cfg.searchable || false, noOptionsMessage: () => cfg.no_options_message || null, options: cfg.options })));
    }
}
export default SelectInput;

//# sourceMappingURL=SelectInput.js.map
