import * as React from 'react';
import styled from 'styled-components';
let default_config = {
    rows: 3
};
const TextareaInputContainer = styled.div `
    text-align: left;
    p {
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: bold;
    }
    textarea {
        border: 2px solid ${props => props.theme.colors.gray[2]};
        border-radius: 4px;
        font-size: 16px;
        padding: 8px 12px;
        width: 100%;
        &:HOVER, &:FOCUS {
            border-color: ${props => props.theme.colors.brand[2]};
        }
    }
`;
class TextareaInput extends React.Component {
    onChange(value) {
        const cfg = this.props.config;
        this.props.onChange(value);
        if (cfg.onChange) {
            if (cfg.trim) {
                cfg.onChange(value.trim());
            }
            else {
                cfg.onChange(value);
            }
        }
    }
    render() {
        let cfg = Object.assign({}, default_config, this.props.config);
        let class_names = "user_input textarea_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        return (React.createElement(TextareaInputContainer, { className: class_names },
            cfg.label ? React.createElement("p", null, cfg.label) : null,
            React.createElement("textarea", { rows: cfg.rows || 3, autoFocus: this.props.autofocus || false, placeholder: cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '', value: this.props.value, onChange: e => this.onChange(e.target.value) })));
    }
}
export default TextareaInput;

//# sourceMappingURL=TextareaInput.js.map
