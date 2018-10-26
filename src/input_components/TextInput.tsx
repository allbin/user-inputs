import * as React from 'react';
import styled from 'styled-components';
const Quagga = require('quagga');
import { FaBarcode } from 'react-icons/fa';
import oh from 'output-helpers';

export interface TextInputConfig {
    label?: string;
    class_name?: string;
    barcode?: boolean;
    barcode_stream_visible: boolean;
}
export interface TextInputProps {
    value: string;
    config: TextInputConfig;
    onChange: (string) => void;
    autofocus?: boolean;
}

class TextInput extends React.Component<TextInputProps, TextInputConfig> {
    container: typeof React.Component;
    barcode_stream_target: HTMLDivElement|null;
    detectedCB: (data: LooseObject) => void;

    constructor(props) {
        super(props);

        this.container = styled.div `
            text-align: left;
            p{
                color: ${props => props.theme.colors.dark[1]};
                font-size: 14px;
                margin-bottom: 12px;
                font-weight: bold;
            }
            input{
                border: 2px solid ${props => props.theme.colors.gray[2]};
                border-radius: 4px;
                font-size: 16px;
                padding: 8px 12px;
                width: 100%;
                transition: all 0.3s;
                &:HOVER, &:FOCUS{
                    border-color: ${props => props.theme.colors.brand[2]};
                }
                &.small{
                    width: 90%;
                }
            }
            .barcode_btn{
                width: 20px;
                height: 20px;
            }
            .barcode_stream_target{
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 100000000;
                &.show {
                    display: block;
                }
            }
            .barcode_stream_target_close_btn{
                position: absolute;
                bottom: 5px;
                left: 5%;
                width: 90%;
                height: 30px;
                background-color: white;
                border: 1px solid black;
            }
        `;

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
                readers: ["ean_reader"]
            },
            locator: {
                halfSample: true,
                patchSize: "medium"
            }
        };

        this.setState({
            barcode_stream_visible: true
        });

        Quagga.init(quagga_config, (err) => {
            if (err) {
                console.error(err);
                throw err;
            }

            Quagga.onDetected(this.detectedCB);

            Quagga.start();
        });
    }



    renderBarcodeBtn(cfg) {
        if (cfg.barcode !== true) {
            return null;
        }

        let barcode_stream_classes = ["barcode_stream_target"];

        if (this.state.barcode_stream_visible) {
            barcode_stream_classes.push("show");
        }

        return (
            <div>
                <div
                    className="barcode_btn"
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
                        { oh.translate("user_input_hoc_cancel") }
                    </div>
                </div>
            </div>
        );
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

        return (
            <this.container className={class_names}>
                { cfg.label ? <p>{ cfg.label }</p> : null }
                <input
                    className={input_class_name}
                    autoFocus={this.props.autofocus || false}
                    type="text"
                    value={this.props.value}
                    onChange={e => this.props.onChange(e.target.value)}
                />
                { this.renderBarcodeBtn(cfg) }
            </this.container>
        );
    }
}

export default TextInput;
