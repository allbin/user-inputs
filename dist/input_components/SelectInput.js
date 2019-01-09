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
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_1 = require("../styling/styled");
var react_select_1 = require("react-select");
var SelectInputContainer = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    text-align: left;\n    p.multi_select_label {\n        color: ", ";\n        font-size: 14px;\n        margin-bottom: 12px;\n        font-weight: bold;\n    }\n"], ["\n    text-align: left;\n    p.multi_select_label {\n        color: ", ";\n        font-size: 14px;\n        margin-bottom: 12px;\n        font-weight: bold;\n    }\n"])), function (props) { return props.theme.colors.dark[1]; });
var SelectInput = /** @class */ (function (_super) {
    __extends(SelectInput, _super);
    function SelectInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectInput.prototype.render = function () {
        var _this = this;
        var cfg = this.props.config;
        var class_names = "user_input select_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        return (React.createElement(SelectInputContainer, { className: class_names },
            cfg.label ? React.createElement("p", { className: "multi_select_label" }, cfg.label) : null,
            React.createElement(react_select_1.default, { placeholder: cfg.placeholder ? cfg.placeholder : cfg.label ? cfg.label : '', value: this.props.value, onChange: function (e) {
                    _this.props.onChange(e);
                }, isDisabled: cfg.disabled || false, isSearchable: cfg.searchable || false, noOptionsMessage: function () { return cfg.no_options_message || null; }, options: cfg.options })));
    };
    return SelectInput;
}(React.Component));
exports.default = SelectInput;
var templateObject_1;

//# sourceMappingURL=SelectInput.js.map
