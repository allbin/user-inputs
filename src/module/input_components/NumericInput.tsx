import * as React from 'react';
import styled from 'styled-components';

export interface NumericInputConfig {
    type: "numeric";
    key: string;
    default_value: number;
    number_type: "integer"|"float";

    class_name?: string;
    label?: string;
    tooltip?: string;
    message?: string;
    max?: number;
    min?: number;
    step?: number;
    onChange?: (value: number) => void;
    onValidate?: (value: string) => boolean;
}
export interface NumericInputProps {
    value: string;
    config: NumericInputConfig;
    onChange: (value: string) => void;
    autofocus?: boolean;
}


interface NumericInputState {
    blocked: boolean;
}

const NumericInputContainer = styled.div `
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
export class NumericInput extends React.Component<NumericInputProps, NumericInputState> {

    onChange(value: string) {
        this.props.onChange(value);
    }

    render() {
        let cfg = this.props.config;
        let class_names = "user_input numeric_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }

        return (
            <NumericInputContainer className={class_names}>
                { cfg.label ? <p>{ cfg.label }</p> : null }
                { cfg.message ? <p className="message">{ cfg.message }</p> : null }
                <input
                    type="text"
                    autoFocus={this.props.autofocus || false}
                    value={this.props.value}
                    onChange={e => this.onChange(e.target.value)}
                />
            </NumericInputContainer>
        );
    }
}

export function validateNumeric(cfg: NumericInputConfig, value: string): boolean {
    if (cfg.onValidate) {
        return cfg.onValidate(value);
    }
    if (cfg.number_type === "integer") {
        let parsed = parseInt(value, 10);
        if (!Number.isNaN(parsed) && Number.isFinite(parsed) && Number.isSafeInteger(parsed) && parsed.toString(10) === value.trim()) {
            return true;
        }
        return false;
    }

    let parsed = parseFloat(value);
    if (!Number.isNaN(parsed) && Number.isFinite(parsed) && parsed.toString() === value.trim()) {
        return true;
    }
    return false;
}

export function validateNumericConfig(cfg: NumericInputConfig): true|string {
    if (cfg.number_type !== "integer" && cfg.number_type !== "float") {
        return "UserInput: Numeric input config 'numer_type' must be 'float' or 'integer'.";
    }

    return true;
}

export function getParsedValue(cfg: NumericInputConfig, value: string): number {
    if (cfg.number_type === "integer") {
        let parsed = parseInt(value, 10);
        if (!Number.isNaN(parsed) && Number.isFinite(parsed) && Number.isSafeInteger(parsed) && parsed.toString(10) === value.trim()) {
            return parsed;
        }
        return cfg.default_value;
    }

    let parsed = parseFloat(value);
    if (!Number.isNaN(parsed) && Number.isFinite(parsed) && parsed.toString() === value.trim()) {
        return parsed;
    }
    return cfg.default_value;
}
