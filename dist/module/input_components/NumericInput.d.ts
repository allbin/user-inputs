import * as React from 'react';
export interface NumericInputConfig {
    type: "numeric";
    key: string;
    default_value: number;
    number_type: "integer" | "float";
    class_name?: string;
    label?: string;
    /** TODO: Implement tooltip */
    tooltip?: string;
    message?: string;
    max?: number;
    min?: number;
    /** TODO: Implement step functionality. Use +/- keys as well as UI buttons? */
    step?: number;
    onValueChange?: (value: number) => void;
    /** Return error message. Empty string displays no message but marks the input as invalid. */
    validationCB?: (value: string) => null | string;
}
export interface NumericInputProps {
    value: string;
    config: NumericInputConfig;
    onChange: (value: string, cb: () => void) => void;
    display_error_message: boolean;
    autofocus?: boolean;
}
interface NumericInputState {
    blocked: boolean;
}
export declare class Input extends React.Component<NumericInputProps, NumericInputState> {
    onChange(value: string): void;
    render(): JSX.Element;
}
export declare function validate(cfg: NumericInputConfig, value: string): null | string;
export declare function validateConfig(cfg: NumericInputConfig): null | string;
export declare function convertInternalToExternalValue(cfg: NumericInputConfig, value: string): number;
export declare function convertExternalToInternalValue(cfg: NumericInputConfig, value: number): string;
export {};
