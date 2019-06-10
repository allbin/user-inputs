import * as React from 'react';
import { LooseObject } from '../index';
export interface TextInputConfig {
    label?: string;
    class_name?: string;
    barcode?: boolean;
    barcode_stream_visible: boolean;
    barcode_stream_failed: boolean;
}
export interface TextInputProps {
    value: string;
    config: TextInputConfig;
    onChange: (string: any) => void;
    autofocus?: boolean;
}
declare class TextInput extends React.Component<TextInputProps, TextInputConfig> {
    container: typeof React.Component;
    barcode_stream_target: HTMLDivElement | null;
    barcode_stream_failed: boolean;
    detectedCB: (data: LooseObject) => void;
    constructor(props: any);
    startBarcodeReading(): void;
    renderBarcodeBtn(cfg: any): JSX.Element;
    render(): JSX.Element;
}
export default TextInput;
//# sourceMappingURL=TextInput.d.ts.map