import * as React from 'react';
import styled from 'styled-components';
const Quagga = require('quagga');
import { FaBarcode } from 'react-icons/fa';
import oh from 'output-helpers';
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
    onChange: (string) => void;
    autofocus?: boolean;
}

const CameraError = styled("div")`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
    background-color: #c12a22;
    color: #fff;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .camera_error_text {
        color: #fff;
        text-align: center;
    }
`;

class TextInput extends React.Component<TextInputProps, TextInputConfig> {
    container: typeof React.Component;
    barcode_stream_target: HTMLDivElement|null;
    barcode_stream_failed: boolean;
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

        this.barcode_stream_target = null;

        this.state = {
            barcode_stream_visible: false,
            barcode_stream_failed: false
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
                target: this.barcode_stream_target,
                area: { // defines rectangle of the detection/localization area
                    top: "25%",    // top offset
                    right: "25%",  // right offset
                    left: "25%",   // left offset
                    bottom: "25%"  // bottom offset
                },
            },
            frequency: 5,
            decoder: {
                readers: ["code_128_reader", "code_39_reader", "ean_reader"],
                drawBoundingBox: true,
                drawScanline: true,
                showPattern: true,
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
                this.setState({
                    barcode_stream_failed: true
                });
                return;
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
            <div className="barcode_reader">
                <div className="barcode_btn"
                    onClick={() => {
                        this.startBarcodeReading();
                    }}
                >
                    <FaBarcode />
                </div>
                {
                    this.state.barcode_stream_failed === true ?
                    <CameraError
                        onClick={() => {
                            this.setState({
                                barcode_stream_failed: false
                            });
                        }}
                    >
                        <p className="camera_error_text">{ oh.translate("user_input_hoc_camera_error") }</p>
                        <p className="camera_error_text">{ oh.translate("user_input_hoc_click_to_dismiss") }</p>
                    </CameraError>
                    :
                    null
                }
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
                                barcode_stream_visible: false,
                                barcode_stream_failed: false
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
