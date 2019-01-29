import * as React from 'react';
import styled from 'styled-components';
const TriStateInputContainer = styled.div `
    text-align: left;
    p.tri_state_label {
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: bold;
    }
    p.message{
        color: ${props => props.theme.colors.dark[2]};
        font-size: 12px;
        margin-bottom: 6px;
        font-weight: normal;
        font-style: italic;
    }
    .grid_block{
        background-color: ${props => props.theme.colors.gray[3]};
        text-align: center;
        border-radius: 50px;
        position: relative;
        .grid_block_bg{
            background-color: ${props => props.theme.colors.blue[1]};
            position: absolute;
            border-radius: 50px;
            width: 33%;
            top: 0;
            bottom: 0;
            transition: all 0.4s;
        }
        .grid_item{
            position: relative;
            cursor: pointer;
            padding: 20px 0;
            font-size: 16px;
            display: inline-block;
            width: 33%;
            &.active{
                font-weight: bold;
                color: #fff;
            }
        }
    }
`;
export class Input extends React.Component {
    onChange(value) {
        const cfg = this.props.config;
        this.props.onChange(value);
        if (cfg.onValueChange) {
            cfg.onValueChange(getParsedValue(cfg, value));
        }
    }
    render() {
        let cfg = this.props.config;
        let class_names = "user_input tri_state_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        const LEFT_POSITION = cfg.options.findIndex(option => option.value === this.props.value);
        return (React.createElement(TriStateInputContainer, { className: class_names },
            cfg.label ? React.createElement("p", { className: "tri_state_label" }, cfg.label) : null,
            cfg.message ? React.createElement("p", { className: "message" }, cfg.message) : null,
            React.createElement("div", { className: "grid_block" },
                React.createElement("div", { className: "grid_block_bg", style: { left: 33.333333333333 * LEFT_POSITION + '%' } }),
                cfg.options.map((item, i) => {
                    return (React.createElement("div", { key: i, className: `grid_item ${this.props.value === item.value ? 'active' : ''}`, onClick: () => {
                            this.onChange(item.value);
                        } },
                        React.createElement("span", null, item.label)));
                }))));
    }
}
export function validate(cfg, value) {
    return null;
}
export function validateConfig(cfg) {
    if (validate(cfg, cfg.default_value)) {
        return "UserInput: Invalid default_value for TriState.";
    }
    return null;
}
export function getParsedValue(cfg, value) {
    return value;
}

//# sourceMappingURL=TriStateInput.js.map
