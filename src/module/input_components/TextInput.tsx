import * as React from 'react';
import styled from 'styled-components';
const Quagga = require('quagga');
import { FaBarcode } from 'react-icons/fa';
import oh from 'output-helpers';
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
    validationCB?: (value: string) => null|string;
}
export interface TextInputProps {
    value: string;
    config: TextInputConfig;
    onChange: (value: string) => void;
    display_error_message: boolean;
    autofocus?: boolean;
}

interface TextInputState {
    barcode_stream_visible: boolean;
}

interface ContainerStyleProps {
    valid: boolean;
}

const TextInputContainer = styled("div")<ContainerStyleProps> `
    text-align: left;
    p{
        color: ${props => props.theme.colors.dark[1]};
        font-size: 14px;
        margin-bottom: 8px;
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
    input{
        background-color: ${props => !props.valid ? "rgba(255,0,0,0.1)" : "" };
        border: 2px solid ${props => !props.valid ? props.theme.colors.error : props.theme.colors.gray[2]};
        border-radius: 4px;
        font-size: 16px;
        padding: 8px 12px;
        width: 100%;
        transition: all 0.3s;
        &:HOVER, &:FOCUS{
            border-color: ${props => !props.valid ? props.theme.colors.error : props.theme.colors.brand[2]};
        }
        &.small{
            width: calc(100% - 80px);
            display: inline-block;
            vertical-align: middle;
        }
    }
    .barcode_reader{
        display: inline-block;
        width: 70px;
        .barcode_btn{
            background-color: #1378ef;
            margin-left: 10px;
            width: 70px;
            text-align: center;
            height: 50px;
            vertical-align: middle;
            border-radius: 4px;
            svg{
                height: 50px;
                width: 36px;
                vertical-align: middle;
                fill: #fff;
            }
        }
    }

    .barcode_stream_target{
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 93%;
        z-index: 1000000;
        &.show {
            display: block;
        }
    }
    .barcode_stream_target_close_btn{
        text-align: center;
        padding: 20px;
        background-color: #EB4D44;
        color: #fff;
        font-weight: bold;
        border-radius: 4px;
        box-shadow: 0 5px 10px rgba(0,0,0,0.2);
        /* width: 100%; */
        bottom: 20px;
        left: 20px;
        right: 20px;
        z-index: 16000000;
        position: absolute;
        &:HOVER{
            background-color: #c12a22;
        }
    }
`;
export class Input extends React.Component<TextInputProps, TextInputState> {
    barcode_stream_target: HTMLDivElement|null;
    detectedCB: (data: LooseObject) => void;

    constructor(props: TextInputProps) {
        super(props);

        this.barcode_stream_target = null;

        this.state = {
            barcode_stream_visible: false
        };

        this.detectedCB = (data) => {
            Quagga.offDetected(this.detectedCB);
            Quagga.stop();
            let result = data.codeResult.code;
            this.props.onChange(result);
            this.setState({
                barcode_stream_visible: false
            });
        };

    }

    startBarcodeReading() {
        if (!this.barcode_stream_target) {
            return;
        }
        let quagga_config = {
            numOfWorkers: navigator.hardwareConcurrency,
            locate: true,
            inputStream: {
                name: "Live",
                type: "LiveStream",
                constraints: {
                    width: 1280,
                    height: 720,
                    facingMode: "environment"
                },
                target: this.barcode_stream_target
            },
            frequency: 5,
            decoder: {
                readers: ["code_128_reader", "code_39_reader", "ean_reader"]
            },
            locator: {
                halfSample: true,
                patchSize: "medium"
            }
        };

        this.setState({
            barcode_stream_visible: true
        });

        Quagga.init(quagga_config, (err: any) => {
            if (err) {
                console.error(err);
                throw err;
            }

            Quagga.onDetected(this.detectedCB);

            Quagga.start();
        });
    }



    renderBarcodeBtn(cfg: TextInputConfig) {
        if (cfg.barcode !== true) {
            return null;
        }

        let barcode_stream_classes = ["barcode_stream_target"];
        if (this.state.barcode_stream_visible) {
            barcode_stream_classes.push("show");
        }

        return (
            <div className="barcode_reader">
                <div className="barcode_btn"
                    onClick={() => {
                        this.startBarcodeReading();
                    }}
                >
                    <FaBarcode />
                </div>
                <div
                    className={barcode_stream_classes.join(" ")}
                    ref={(ref) => { this.barcode_stream_target = ref; }}
                >
                    <div
                        className={"barcode_stream_target_close_btn"}
                        onClick={() => {
                            Quagga.offDetected(this.detectedCB);
                            Quagga.stop();
                            this.setState({
                                barcode_stream_visible: false
                            });
                        }}
                    >
                        { oh.translate("user_input_cancel") }
                    </div>
                </div>
            </div>
        );
    }

    onChange(value: string) {
        const cfg = this.props.config;
        this.props.onChange(value);
        if (cfg.onValueChange && !validate(cfg, value)) {
            cfg.onValueChange(convertInternalToExternalValue(cfg, value));
        }
    }

    render() {
        let cfg = this.props.config;
        let class_names = "user_input text_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        let input_class_name = "full";
        if (cfg.barcode === true) {
            input_class_name = "small";
        }

        const validation_error = validate(cfg, this.props.value);

        return (
            <TextInputContainer
                className={class_names}
                valid={!validation_error || !this.props.display_error_message}
            >
                { cfg.label ? <p>{ cfg.label }</p> : null }
                { cfg.message ? <p className="message">{ cfg.message }</p> : null }
                { validation_error && this.props.display_error_message && validation_error.length > 0 ? <p className="validation_error">{ validation_error }</p> : null }
                <input
                    className={input_class_name}
                    autoFocus={this.props.autofocus || false}
                    type="text"
                    value={this.props.value}
                    onChange={e => this.onChange(e.target.value)}
                />
                { this.renderBarcodeBtn(cfg) }
            </TextInputContainer>
        );
    }
}

export function validate(cfg: TextInputConfig, value: string): null|string {
    if (cfg.validationCB) {
        return cfg.validationCB(value);
    }
    return null;
}

export function validateConfig(cfg: TextInputConfig): null|string {


    return null;
}

export function convertInternalToExternalValue(cfg: TextInputConfig, value: string): string {
    if (!cfg.trim) {
        return value;
    }
    return value.trim();
}

export function convertExternalToInternalValue(cfg: TextInputConfig, value: any): string {
    return value.toString();
}
