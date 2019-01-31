import * as React from 'react';
import { LooseObject } from '../.';
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
    validationCB?: (value: string) => null | string;
}
export interface TextInputProps {
    value: string;
    config: TextInputConfig;
    onChange: (value: string, cb: () => void) => void;
    display_error_message: boolean;
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
export declare function convertInternalToExternalValue(cfg: TextInputConfig, value: string): string;
export declare function convertExternalToInternalValue(cfg: TextInputConfig, value: any): string;
export {};
