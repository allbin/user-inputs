import * as React from 'react';
import styled from 'styled-components';

export type GridType = "icons" | "colors";
interface GridInputStyleProps {
    grid_type: GridType;
    presentation: string;
}
export interface GridInputConfig {
    label: string;
    grid_type: GridType;
    options: any;
}
export interface GridInputProps {
    value: any;
    config: GridInputConfig;
    onChange: (any) => void;
}


class GridInput extends React.Component<GridInputProps, any> {
    container: typeof React.Component;
    gridItem: typeof React.Component;

    constructor(props) {
        super(props);
        this.container = styled.div<GridInputStyleProps>`
            text-align: left;
            padding: 16px 20px !important;
            p, .bool_block, .bool_input{
                vertical-align: middle;
                display: inline-block;
            }
            p{
                color: ${props => props.theme.colors.dark[1]};
                font-size: 14px;
                margin-bottom: 12px;
                font-weight: bold;
            }
            .grid_block{
                border-radius: 4px;
                background-color: ${props => props.theme.colors.border};
                padding: 4px;
                display: grid;
                grid-template-columns: ${props => props.grid_type === 'colors' || props.grid_type === 'icons' ? 'repeat(6, 1fr)' : 'repeat(4, 1fr)'};
                grid-gap: 4px 4px;
            }
        `;

        this.gridItem = styled.div<GridInputStyleProps>`
            box-shadow: 0 2px 3px rgba(38, 38, 38, 0.12);
            background-color: #fff;
            cursor: pointer;
            border-radius: 4px;
            padding: ${props => props.grid_type === 'icons' ? '6px 0' : '12px 0'};
            height: ${props => props.grid_type === 'colors' || props.grid_type === 'icons' ? '44px' : 'unset'};
            text-align: center;
            font-size: 12px;
            &:HOVER{
                background-color: ${props => props.grid_type === 'colors' ? props.presentation : props.theme.colors.dark[1]};
                opacity: 0.5;
                color: #fff;
            }
            &.active{
                background-color: ${props => props.grid_type === 'colors' ? props.presentation : props.theme.colors.dark[1]};
                color: #fff;
                font-weight: bold;
                &:HOVER{
                    opacity: 1;
                }
            }
            span{
                display: ${props => props.grid_type === 'colors' || props.grid_type === 'icons' ? 'none' : 'inline-block'};
            }
            svg{
                width: 30px;
                height: 30px;
            }
        `;

    }

    render() {
        let cfg = this.props.config;
        return (
            <this.container
                grid_type={cfg.grid_type}
                className="user_input bool_input">
                { cfg.label ? <p>{ cfg.label }</p> : null }
                <div className="grid_block">
                    {
                        cfg.options.map((item, i) => {
                            return (
                                <this.gridItem
                                    presentation={item.presentation}
                                    grid_type={cfg.grid_type}
                                    key={i}
                                    className={`grid_item ${this.props.value === item.value ? 'active' : ''}`}
                                    onClick={() => {
                                        this.props.onChange(item.value);
                                    }}
                                    >
                                    { cfg.grid_type === 'icons' ? null : <span>{item.presentation}</span> }

                                </this.gridItem>
                            );
                        })
                    }
                </div>
            </this.container>
        );
    }
}

export default GridInput;
