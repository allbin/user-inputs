import * as React from 'react';
import styled from 'styled-components';
// this.props has everything passed in to config.props as well as the full config object in this.props.config.

export interface TriStateInputOptions {
    value: any;
    label: string;
}
export interface TriStateInputConfig {
    label?: string;
    options: TriStateInputOptions[];
    placeholder?: string;
    class_name?: string;
    no_options_message?: string;
    searchable?: boolean;
    disabled?: boolean;
}
export interface TriStateInputProps {
    value?: string;
    config: TriStateInputConfig;
    onChange: (string) => void;
}

const TriStateInputContainer = styled.div `
    text-align: left;
    p.multi_select_label {
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 12px;
        font-weight: bold;
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

class TriStateInput extends React.Component<TriStateInputProps, TriStateInputConfig> {
    render() {
        let cfg = this.props.config;
        let class_names = "user_input tri_state_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        const LEFT_POSITION = cfg.options.findIndex(option => option.value === this.props.value);

        return (
            <TriStateInputContainer className={class_names}>
                { cfg.label ? <p className="multi_select_label">{ cfg.label }</p> : null }
                <div className="grid_block">
                    <div className="grid_block_bg" style={{left: 33.333333333333 * LEFT_POSITION + '%'}}></div>
                    {
                        cfg.options.map((item, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`grid_item ${this.props.value === item.value ? 'active' : ''}`}
                                    onClick={() => {
                                        this.props.onChange(item.value);
                                    }}
                                    >
                                    <span>{item.label}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </TriStateInputContainer>
        );
    }
}

export default TriStateInput;
