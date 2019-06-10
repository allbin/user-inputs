"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var Quagga = require('quagga');
var fa_1 = require("react-icons/fa");
var output_helpers_1 = require("output-helpers");
var CameraError = styled_components_1.default("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    position: absolute;\n    left: 5%;\n    top: 5%;\n    right: 5%;\n    padding: 20px;\n    background-color: #c12a22;\n    color: #fff;\n    font-size: 16px;\n"], ["\n    position: absolute;\n    left: 5%;\n    top: 5%;\n    right: 5%;\n    padding: 20px;\n    background-color: #c12a22;\n    color: #fff;\n    font-size: 16px;\n"])));
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput(props) {
        var _this = _super.call(this, props) || this;
        _this.container = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            text-align: left;\n            p{\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            input{\n                border: 2px solid ", ";\n                border-radius: 4px;\n                font-size: 16px;\n                padding: 8px 12px;\n                width: 100%;\n                transition: all 0.3s;\n                &:HOVER, &:FOCUS{\n                    border-color: ", ";\n                }\n                &.small{\n                    width: calc(100% - 80px);\n                    display: inline-block;\n                    vertical-align: middle;\n                }\n            }\n            .barcode_reader{\n                display: inline-block;\n                width: 70px;\n                .barcode_btn{\n                    background-color: #1378ef;\n                    margin-left: 10px;\n                    width: 70px;\n                    text-align: center;\n                    height: 50px;\n                    vertical-align: middle;\n                    border-radius: 4px;\n                    svg{\n                        height: 50px;\n                        width: 36px;\n                        vertical-align: middle;\n                        fill: #fff;\n                    }\n                }\n            }\n\n            .barcode_stream_target{\n                display: none;\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 93%;\n                z-index: 1000000;\n                &.show {\n                    display: block;\n                }\n            }\n            .barcode_stream_target_close_btn{\n                text-align: center;\n                padding: 20px;\n                background-color: #EB4D44;\n                color: #fff;\n                font-weight: bold;\n                border-radius: 4px;\n                box-shadow: 0 5px 10px rgba(0,0,0,0.2);\n                /* width: 100%; */\n                bottom: 20px;\n                left: 20px;\n                right: 20px;\n                z-index: 16000000;\n                position: absolute;\n                &:HOVER{\n                    background-color: #c12a22;\n                }\n            }\n        "], ["\n            text-align: left;\n            p{\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            input{\n                border: 2px solid ", ";\n                border-radius: 4px;\n                font-size: 16px;\n                padding: 8px 12px;\n                width: 100%;\n                transition: all 0.3s;\n                &:HOVER, &:FOCUS{\n                    border-color: ", ";\n                }\n                &.small{\n                    width: calc(100% - 80px);\n                    display: inline-block;\n                    vertical-align: middle;\n                }\n            }\n            .barcode_reader{\n                display: inline-block;\n                width: 70px;\n                .barcode_btn{\n                    background-color: #1378ef;\n                    margin-left: 10px;\n                    width: 70px;\n                    text-align: center;\n                    height: 50px;\n                    vertical-align: middle;\n                    border-radius: 4px;\n                    svg{\n                        height: 50px;\n                        width: 36px;\n                        vertical-align: middle;\n                        fill: #fff;\n                    }\n                }\n            }\n\n            .barcode_stream_target{\n                display: none;\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 93%;\n                z-index: 1000000;\n                &.show {\n                    display: block;\n                }\n            }\n            .barcode_stream_target_close_btn{\n                text-align: center;\n                padding: 20px;\n                background-color: #EB4D44;\n                color: #fff;\n                font-weight: bold;\n                border-radius: 4px;\n                box-shadow: 0 5px 10px rgba(0,0,0,0.2);\n                /* width: 100%; */\n                bottom: 20px;\n                left: 20px;\n                right: 20px;\n                z-index: 16000000;\n                position: absolute;\n                &:HOVER{\n                    background-color: #c12a22;\n                }\n            }\n        "])), function (props) { return props.theme.colors.dark[1]; }, function (props) { return props.theme.colors.gray[2]; }, function (props) { return props.theme.colors.brand[2]; });
        _this.barcode_stream_target = null;
        _this.state = {
            barcode_stream_visible: false,
            barcode_stream_failed: false
        };
        _this.detectedCB = function (data) {
            Quagga.offDetected(_this.detectedCB);
            Quagga.stop();
            var result = data.codeResult.code;
            _this.props.onChange(result);
            _this.setState({
                barcode_stream_visible: false
            });
        };
        return _this;
    }
    TextInput.prototype.startBarcodeReading = function () {
        var _this = this;
        if (!this.barcode_stream_target) {
            return;
        }
        var quagga_config = {
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
        Quagga.init(quagga_config, function (err) {
            if (err) {
                console.error(err);
                _this.setState({
                    barcode_stream_failed: true
                });
                throw err;
            }
            Quagga.onDetected(_this.detectedCB);
            Quagga.start();
        });
    };
    TextInput.prototype.renderBarcodeBtn = function (cfg) {
        var _this = this;
        if (cfg.barcode !== true) {
            return null;
        }
        var barcode_stream_classes = ["barcode_stream_target"];
        if (this.state.barcode_stream_visible) {
            barcode_stream_classes.push("show");
        }
        return (React.createElement("div", { className: "barcode_reader" },
            React.createElement("div", { className: "barcode_btn", onClick: function () {
                    _this.startBarcodeReading();
                } },
                React.createElement(fa_1.FaBarcode, null)),
            this.state.barcode_stream_failed === true ?
                React.createElement(CameraError, null,
                    React.createElement("p", null, output_helpers_1.default.translate("camera_error")))
                :
                    null,
            React.createElement("div", { className: barcode_stream_classes.join(" "), ref: function (ref) { _this.barcode_stream_target = ref; } },
                React.createElement("div", { className: "barcode_stream_target_close_btn", onClick: function () {
                        Quagga.offDetected(_this.detectedCB);
                        Quagga.stop();
                        _this.setState({
                            barcode_stream_visible: false
                        });
                    } }, output_helpers_1.default.translate("user_input_hoc_cancel")))));
    };
    TextInput.prototype.render = function () {
        var _this = this;
        var cfg = this.props.config;
        var class_names = "user_input text_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        var input_class_name = "full";
        if (cfg.barcode === true) {
            input_class_name = "small";
        }
        return (React.createElement(this.container, { className: class_names },
            cfg.label ? React.createElement("p", null, cfg.label) : null,
            React.createElement("input", { className: input_class_name, autoFocus: this.props.autofocus || false, type: "text", value: this.props.value, onChange: function (e) { return _this.props.onChange(e.target.value); } }),
            this.renderBarcodeBtn(cfg)));
    };
    return TextInput;
}(React.Component));
exports.default = TextInput;
var templateObject_1, templateObject_2;

//# sourceMappingURL=TextInput.js.map
