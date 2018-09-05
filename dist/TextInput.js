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
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput(props) {
        var _this = _super.call(this, props) || this;
        _this.container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            text-align: left;\n            p{\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            input{\n                border: 2px solid ", ";\n                border-radius: 4px;\n                font-size: 16px;\n                padding: 8px 12px;\n                width: 100%;\n                transition: all 0.3s;\n                &:HOVER, &:FOCUS{\n                    border-color: ", ";\n                }\n            }\n        "], ["\n            text-align: left;\n            p{\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            input{\n                border: 2px solid ", ";\n                border-radius: 4px;\n                font-size: 16px;\n                padding: 8px 12px;\n                width: 100%;\n                transition: all 0.3s;\n                &:HOVER, &:FOCUS{\n                    border-color: ", ";\n                }\n            }\n        "])), function (props) { return props.theme.colors.dark[1]; }, function (props) { return props.theme.colors.gray[2]; }, function (props) { return props.theme.colors.brand[2]; });
        return _this;
    }
    TextInput.prototype.render = function () {
        var _this = this;
        var cfg = this.props.config;
        return (React.createElement(this.container, { className: "user_input text_input" },
            cfg.label ? React.createElement("p", null, cfg.label) : null,
            React.createElement("input", { autoFocus: true, type: "text", value: this.props.value, onChange: function (e) { return _this.props.onChange(e.target.value); } })));
    };
    return TextInput;
}(React.Component));
exports.default = TextInput;
var templateObject_1;

//# sourceMappingURL=TextInput.js.map
