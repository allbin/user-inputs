import * as React from 'react';
export declare type GridType = "icons" | "colors";
export interface GridInputConfig {
    label?: string;
    grid_type: GridType;
    options: any;
    class_name?: string;
}
export interface GridInputProps {
    value: any;
    config: GridInputConfig;
    onChange: (any: any) => void;
}
declare class GridInput extends React.Component<GridInputProps, any> {
    container: typeof React.Component;
    gridItem: typeof React.Component;
    constructor(props: any);
    render(): JSX.Element;
}
export default GridInput;
//# sourceMappingURL=GridInput.d.ts.map