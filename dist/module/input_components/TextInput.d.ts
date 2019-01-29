import * as React from 'react';
export interface TextInputConfig {
    type: "text";
    key: string;
    default_value: string;
    barcode?: boolean;
    class_name?: string;
    label?: string;
    message?: string;
    /** TODO: Implement tooltip */
    tooltip?: string;
    trim?: boolean;
    onValueChange?: (value: string) => void;
    onValidate?: (value: string) => null | string;
}
export interface TextInputProps {
    value: string;
    config: TextInputConfig;
    onChange: (value: string) => void;
    autofocus?: boolean;
}
interface TextInputState {
    barcode_stream_visible: boolean;
}
export declare class Input extends React.Component<TextInputProps, TextInputState> {
    barcode_stream_target: HTMLDivElement | null;
    detectedCB: (data: LooseObject) => void;
    constructor(props: TextInputProps);
    startBarcodeReading(): void;
    renderBarcodeBtn(cfg: TextInputConfig): JSX.Element | null;
    onChange(value: string): void;
    render(): JSX.Element;
}
export declare function validate(cfg: TextInputConfig, value: string): null | string;
export declare function validateConfig(cfg: TextInputConfig): null | string;
export declare function getParsedValue(cfg: TextInputConfig, value: string): string;
export {};
