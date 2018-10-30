"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var Quagga = require('quagga');
var fa_1 = require("react-icons/fa");
var output_helpers_1 = require("output-helpers");
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput(props) {
        var _this = _super.call(this, props) || this;
        _this.container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            text-align: left;\n            p{\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            input{\n                border: 2px solid ", ";\n                border-radius: 4px;\n                font-size: 16px;\n                padding: 8px 12px;\n                width: 100%;\n                transition: all 0.3s;\n                &:HOVER, &:FOCUS{\n                    border-color: ", ";\n                }\n                &.small{\n                    width: calc(100% - 80px);\n                    display: inline-block;\n                    vertical-align: middle;\n                }\n            }\n            .barcode_btn{\n                background-color: #1378ef;\n                margin-left: 10px;\n                width: 70px;\n                display: inline-block;\n                text-align: center;\n                height: 50px;\n                vertical-align: middle;\n                border-radius: 4px;\n                svg{\n                    height: 50px;\n                    width: 36px;\n                    vertical-align: middle;\n                    fill: #fff;\n                }\n            }\n            .barcode_stream_target{\n                display: none;\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 93%;\n                z-index: 1000000;\n                &.show {\n                    display: block;\n                }\n            }\n            .barcode_stream_target_close_btn{\n                z-index: 16000000;\n                position: absolute;\n                bottom: 0;\n                left: 0;\n                width: 100%;\n                height: 7%;\n                background-color: white;\n                border: 1px solid black;\n            }\n        "], ["\n            text-align: left;\n            p{\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            input{\n                border: 2px solid ", ";\n                border-radius: 4px;\n                font-size: 16px;\n                padding: 8px 12px;\n                width: 100%;\n                transition: all 0.3s;\n                &:HOVER, &:FOCUS{\n                    border-color: ", ";\n                }\n                &.small{\n                    width: calc(100% - 80px);\n                    display: inline-block;\n                    vertical-align: middle;\n                }\n            }\n            .barcode_btn{\n                background-color: #1378ef;\n                margin-left: 10px;\n                width: 70px;\n                display: inline-block;\n                text-align: center;\n                height: 50px;\n                vertical-align: middle;\n                border-radius: 4px;\n                svg{\n                    height: 50px;\n                    width: 36px;\n                    vertical-align: middle;\n                    fill: #fff;\n                }\n            }\n            .barcode_stream_target{\n                display: none;\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 93%;\n                z-index: 1000000;\n                &.show {\n                    display: block;\n                }\n            }\n            .barcode_stream_target_close_btn{\n                z-index: 16000000;\n                position: absolute;\n                bottom: 0;\n                left: 0;\n                width: 100%;\n                height: 7%;\n                background-color: white;\n                border: 1px solid black;\n            }\n        "])), function (props) { return props.theme.colors.dark[1]; }, function (props) { return props.theme.colors.gray[2]; }, function (props) { return props.theme.colors.brand[2]; });
        _this.barcode_stream_target = null;
        _this.state = {
            barcode_stream_visible: false
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
        Quagga.init(quagga_config, function (err) {
            if (err) {
                console.error(err);
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
        return (React.createElement("div", null,
            React.createElement("div", { className: "barcode_btn", onClick: function () {
                    _this.startBarcodeReading();
                } },
                React.createElement(fa_1.FaBarcode, null)),
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
var templateObject_1;

//# sourceMappingURL=TextInput.js.map
