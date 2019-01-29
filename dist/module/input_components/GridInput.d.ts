import * as React from 'react';
export declare type GridType = "icons" | "colors";
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
    onValueChange?: (value: string | number) => void;
}
export interface GridInputProps {
    value: any;
    config: GridInputConfig;
    onChange: (value: string | number) => void;
}
export declare class Input extends React.Component<GridInputProps, any> {
    onChange(value: string | number): void;
    render(): JSX.Element;
}
export declare function validate(cfg: GridInputConfig, value: string): null | string;
export declare function validateConfig(cfg: GridInputConfig): null | string;
export declare function getParsedValue(cfg: GridInputConfig, value: string | number): string | number;
