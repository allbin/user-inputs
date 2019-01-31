import * as React from 'react';
import styled from '../styling';
import { GridSelectOption } from '../.';

export type GridType = "icons" | "colors";

export interface GridInputConfig {
    type: "grid";
    key: string;
    default_value: string;
    label?: string;
    grid_type: GridType;
    options: any;
    class_name?: string;
    message?: string;
    /** TODO: Implement tooltip */
    tooltip?: string;
    onValueChange?: (value: string|number) => void;
    validationCB?: (value: string|number) => null|string;
}
export interface GridInputProps {
    value: any;
    config: GridInputConfig;
    onChange: (value: string|number, cb: () => void) => void;
    display_error_message: boolean;
}

interface GridInputStyleProps {
    grid_type: GridType;
    valid: boolean;
    color?: string;
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

export class Input extends React.Component<GridInputProps, any> {
    onChange(value: string|number) {
        const cfg = this.props.config;
        this.props.onChange(value, () => {
            let ext_value = convertInternalToExternalValue(cfg, value);
            if (cfg.onValueChange && !validate(cfg, ext_value)) {
                cfg.onValueChange(ext_value);
            }
        });
    }
    render() {
        let cfg = this.props.config;
        let class_names = "user_input grid_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        const validation_error = validate(cfg, this.props.value);

        return (
            <GridInputContainer
                grid_type={cfg.grid_type}
                className={class_names}
                valid={!validation_error || !this.props.display_error_message}
            >
                { cfg.label ? <p>{ cfg.label }</p> : null }
                { cfg.message ? <p className="message">{ cfg.message }</p> : null }
                { validation_error && this.props.display_error_message && validation_error.length > 0 ? <p className="validation_error">{ validation_error }</p> : null }
                <div className="grid_block">
                    {
                        cfg.options.map((item: GridSelectOption, i: number) => {
                            return (
                                <StyledGridItem
                                    color={item.color}
                                    grid_type={cfg.grid_type}
                                    valid={!validation_error || !this.props.display_error_message}
                                    key={i}
                                    className={`grid_item ${this.props.value === item.value ? 'active' : ''}`}
                                    onClick={() => {
                                        this.onChange(item.value);
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

export function validate(cfg: GridInputConfig, value: string|number): null|string {
    if (cfg.validationCB) {
        return cfg.validationCB(value);
    }
    return null;
}

export function validateConfig(cfg: GridInputConfig): null|string {
    if (validate(cfg, cfg.default_value)) {
        return "UserInput: Invalid default_value for Grid.";
    }

    return null;
}

export function convertInternalToExternalValue(cfg: GridInputConfig, value: string|number): string|number {
    return value;
}

export function convertExternalToInternalValue(cfg: GridInputConfig, value: string|number): string|number {
    return value;
}