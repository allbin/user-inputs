import * as React from 'react';
import styled from '../styling';

export interface BoolInputConfig {
    type: "bool";
    key: string;
    default_value: boolean;
    label?: string;
    class_name?: string;
    onChange?: (value: boolean) => void;
    message?: string;
    tooltip?: string;
}
export interface BoolInputProps {
    type: "bool";
    key: string;
    value: boolean;
    config: BoolInputConfig;
    onChange: (checked: boolean) => void;
}

interface BoolInputContainerProps {
    //TODO: What is thing_size?
    thing_size: number;
}

const BoolInputContainer = styled("div")<BoolInputContainerProps> `
    text-align: left;
    padding: 16px 20px !important;
    p, .bool_block, .bool_input{
        vertical-align: middle;
        display: inline-block;
    }
    p{
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        font-weight: bold;
        width: 60%;
        overflow: hidden;
    }
    p.message{
        color: ${props => props.theme.colors.dark[2]};
        font-size: 12px;
        margin-bottom: 6px;
        font-weight: normal;
        font-style: italic;
    }
    .bool_block{
        width: 40%;
        text-align: right;
    }
    .bool_input{
        cursor: pointer;
        border-radius: 100px;
        width: 60px;
        height: ${props => props.thing_size}px;
        position: relative;
        border: 2px solid ${props => props.theme.colors.border};
        background-color: ${props => props.theme.colors.border};
        box-sizing: content-box;
        transition: all 0.3s;
        &:HOVER{
            border-color: ${props => props.theme.colors.brand[2]};
            .bool_input_thing{
                //background-color: ${props => props.theme.colors.dark[2]};
            }
            &.active{
                .bool_input_thing{
                    //background-color: ${props => props.theme.colors.brand[2]};
                }
            }
        }
        &.active{
            background-color: ${props => props.theme.colors.brand[1]};
            .bool_input_thing{
                //background-color: ${props => props.theme.colors.brand[1]};
                left: ${props => props.thing_size}px;
                top: 0;
            }
        }
        .bool_input_thing{
            transition: all 0.4s;
            position: absolute;
            left: 0;
            top: 0;
            background-color: #fff;
            box-shadow: 0 1px 4px rgba(0,0,0,0.5);
            border-radius: 50%;
            width: ${props => props.thing_size}px;
            height: ${props => props.thing_size}px;
        }
    }
`;

export class Input extends React.Component<BoolInputProps, any> {
    onChange(value: boolean) {
        const cfg = this.props.config;
        this.props.onChange(value);
        if (cfg.onChange) {
            cfg.onChange(value);
        }
    }
    render() {
        let cfg = this.props.config;
        let class_names = "user_input bool_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        return (
            <BoolInputContainer
                className={class_names}
                thing_size={30}
            >
                { cfg.label ? <p>{ cfg.label }</p> : null }
                { cfg.message ? <p className="message">{ cfg.message }</p> : null }
                <div className="bool_block">
                    <div
                        className={`bool_input ${this.props.value === true ? 'active' : ''}`}
                        onClick={() => {
                            this.onChange(!this.props.value);
                        }}>
                        <div className="bool_input_thing">

                        </div>
                    </div>
                </div>
            </BoolInputContainer>
        );
    }
}

export function validate(cfg: BoolInputConfig, value: boolean): boolean {
    return true;
}

export function validateConfig(cfg: BoolInputConfig): true|string {
    if (!validate(cfg, cfg.default_value)) {
        return "UserInput: Invalid default_value for Bool.";
    }

    return true;
}

export function getParsedValue(cfg: BoolInputConfig, value: boolean): boolean {
    return value;
}
