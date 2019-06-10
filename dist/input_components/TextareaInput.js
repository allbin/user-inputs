"use strict";
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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var default_config = {
    rows: 3
};
var TextareaInput = /** @class */ (function (_super) {
    __extends(TextareaInput, _super);
    function TextareaInput(props) {
        var _this = _super.call(this, props) || this;
        _this.container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            text-align: left;\n            p {\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            textarea {\n                border: 2px solid ", ";\n                border-radius: 4px;\n                font-size: 16px;\n                padding: 8px 12px;\n                width: 100%;\n                &:HOVER, &:FOCUS {\n                    border-color: ", ";\n                }\n            }\n        "], ["\n            text-align: left;\n            p {\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            textarea {\n                border: 2px solid ", ";\n                border-radius: 4px;\n                font-size: 16px;\n                padding: 8px 12px;\n                width: 100%;\n                &:HOVER, &:FOCUS {\n                    border-color: ", ";\n                }\n            }\n        "])), function (props) { return props.theme.colors.dark[1]; }, function (props) { return props.theme.colors.gray[2]; }, function (props) { return props.theme.colors.brand[2]; });
        return _this;
    }
    TextareaInput.prototype.render = function () {
        var _this = this;
        var cfg = Object.assign({}, default_config, this.props.config);
        var class_names = "user_input textarea_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        return (React.createElement(this.container, { className: class_names },
            cfg.label ? React.createElement("p", null, cfg.label) : null,
            React.createElement("textarea", { rows: 3, autoFocus: this.props.autofocus || false, placeholder: cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '', value: this.props.value, onChange: function (e) { return _this.props.onChange(e.target.value); } })));
    };
    return TextareaInput;
}(React.Component));
exports.default = TextareaInput;
var templateObject_1;

//# sourceMappingURL=TextareaInput.js.map
