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
    onChange?: (value: string | number) => void;
}
export interface GridInputProps {
    value: any;
    config: GridInputConfig;
    onChange: (value: string | number) => void;
}
declare class GridInput extends React.Component<GridInputProps, any> {
    onChange(value: string | number): void;
    render(): JSX.Element;
}
export default GridInput;
