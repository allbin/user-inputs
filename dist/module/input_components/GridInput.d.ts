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
    validationCB?: (value: string | number) => null | string;
}
export interface GridInputProps {
    value: any;
    config: GridInputConfig;
    onChange: (value: string | number) => void;
    display_error_message: boolean;
}
export declare class Input extends React.Component<GridInputProps, any> {
    onChange(value: string | number): void;
    render(): JSX.Element;
}
export declare function validate(cfg: GridInputConfig, value: string): null | string;
export declare function validateConfig(cfg: GridInputConfig): null | string;
export declare function convertInternalToExternalValue(cfg: GridInputConfig, value: string | number): string | number;
export declare function convertExternalToInternalValue(cfg: GridInputConfig, value: string | number): string | number;
