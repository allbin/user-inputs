import * as React from 'react';
import styled from '../styling';
import Select from 'react-select';
const MultiSelectInputContainer = styled("div") `
    text-align: left;
    p.multi_select_label {
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: bold;
    }
`;
class MultiSelectInput extends React.Component {
    onChange(values) {
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
        return (React.createElement(MultiSelectInputContainer, { className: class_names },
            cfg.label ? React.createElement("p", { className: "multi_select_label" }, cfg.label) : null,
            React.createElement(Select, { placeholder: cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '', isMulti: true, value: this.props.value, onChange: (e) => {
                    this.onChange(e);
                }, isSearchable: cfg.searchable || false, isDisabled: cfg.disabled || false, noOptionsMessage: () => cfg.no_options_message || null, options: cfg.options })));
    }
}
export default MultiSelectInput;

//# sourceMappingURL=MultiSelectInput.js.map
