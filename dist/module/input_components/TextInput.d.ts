import * as React from 'react';
export interface TextInputConfig {
    type: "text";
    key: string;
    default_value: string;
    label?: string;
    class_name?: string;
    barcode?: boolean;
    trim?: boolean;
    onChange?: (value: string) => void;
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
declare class TextInput extends React.Component<TextInputProps, TextInputState> {
    barcode_stream_target: HTMLDivElement | null;
    detectedCB: (data: LooseObject) => void;
    constructor(props: TextInputProps);
    startBarcodeReading(): void;
    renderBarcodeBtn(cfg: TextInputConfig): JSX.Element | null;
    onChange(value: string): void;
    render(): JSX.Element;
}
export default TextInput;
