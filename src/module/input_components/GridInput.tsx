import * as React from 'react';
import styled from '../styling';

export type GridType = "icons" | "colors";
interface GridInputStyleProps {
    grid_type: GridType;
}
export interface GridInputConfig {
    label?: string;
    grid_type: GridType;
    options: any;
    class_name?: string;
}
export interface GridInputProps {
    value: any;
    config: GridInputConfig;
    onChange: (value: any) => void;
}

const GridInputContainer = styled.div<GridInputStyleProps>`
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
        grid-template-columns: ${props => props.grid_type === 'colors' || props.grid_type === 'icons' ? 'repeat(6, 1fr)' : 'repeat( auto-fit, minmax(120px, 1fr) )'};
        grid-gap: 4px 4px;
    }
`;

const StyledGridItem = styled.div<GridInputStyleProps>`
    box-shadow: 0 2px 3px rgba(38, 38, 38, 0.12);
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px;
    padding: ${props => props.grid_type === 'icons' ? '6px 0' : '16px 0'};
    height: ${props => props.grid_type === 'colors' || props.grid_type === 'icons' ? '44px' : 'unset'};
    text-align: center;
    font-size: 16px;
    &:HOVER{
        background-color: ${props => props.grid_type === 'colors' ? props.color : props.theme.colors.dark[1]};
        opacity: 0.5;
        color: #fff;
    }
    &.active{
        background-color: ${props => props.grid_type === 'colors' ? props.color : props.theme.colors.dark[1]};
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

class GridInput extends React.Component<GridInputProps, any> {

    render() {
        let cfg = this.props.config;
        let class_names = "user_input grid_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        return (
            <GridInputContainer
                grid_type={cfg.grid_type}
                className={class_names}>
                { cfg.label ? <p>{ cfg.label }</p> : null }
                <div className="grid_block">
                    {
                        cfg.options.map((item: any, i: number) => {
                            return (
                                <StyledGridItem
                                    color={item.color}
                                    grid_type={cfg.grid_type}
                                    key={i}
                                    className={`grid_item ${this.props.value === item.value ? 'active' : ''}`}
                                    onClick={() => {
                                        this.props.onChange(item.value);
                                    }}
                                    >
                                    { cfg.grid_type === 'icons' ? null : <span>{item.label}</span> }

                                </StyledGridItem>
                            );
                        })
                    }
                </div>
            </GridInputContainer>
        );
    }
}

export default GridInput;
