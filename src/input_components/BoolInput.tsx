import * as React from 'react';
import styled from 'styled-components';

export interface BoolInputConfig {
    label: string;
}
export interface BoolInputProps {
    value: boolean;
    config: BoolInputConfig;
    onChange: (boolean) => void;
}

class BoolInput extends React.Component<BoolInputProps, any> {
    container: typeof React.Component;

    constructor(props) {
        super(props);
        const thing_size = '30px';
        this.container = styled.div `
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
            .bool_block{
                width: 40%;
                text-align: right;
            }
            .bool_input{
                cursor: pointer;
                border-radius: 100px;
                width: 60px;
                height: ${thing_size};
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
                        left: ${thing_size};
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
                    width: ${thing_size};
                    height: ${thing_size};
                }
            }
        `;

    }

    render() {
        let cfg = this.props.config;
        return (
            <this.container className="user_input bool_input">
                { cfg.label ? <p>{ cfg.label }</p> : null }
                <div className="bool_block">
                    <div
                        className={`bool_input ${this.props.value === true ? 'active' : ''}`}
                        onClick={() => {
                            this.props.onChange(!this.props.value);
                        }}>
                        <div className="bool_input_thing">

                        </div>
                    </div>
                </div>
            </this.container>
        );
    }
}

export default BoolInput;
