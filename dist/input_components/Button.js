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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        var _this = _super.call(this, props) || this;
        _this.container = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            font-size: 14px;\n            user-select: none;\n            border: ", ";\n            display: ", ";\n            width: ", ";\n            cursor: pointer;\n            border-radius: 200px;\n            background-color: ", ";\n            color: #fff;\n            text-align: center;\n            padding: 12px 20px;\n            font-weight: bold;\n            transition: all 0.3s;\n            &.big{\n                padding: 20px 44px;\n            }\n            &.disabled{\n                pointer-events: none;\n                opacity: 0.4;\n            }\n            &.light{\n                background-color: ", ";\n                border: ", ";\n            }\n            &.dark{\n                background-color: ", ";\n                border: ", ";\n                &:HOVER{\n                    background-color: ", ";\n                    border: ", ";\n                }\n            }\n            &.red{\n                background-color: ", ";\n                border: ", ";\n                &:HOVER{\n                    background-color: ", ";\n                    border: ", ";\n                }\n            }\n            &.green{\n                background-color: ", ";\n                border: ", ";\n                &:HOVER{\n                    background-color: ", ";\n                    border: ", ";\n                }\n            }\n            &.teal{\n                background-color: ", ";\n                border: ", ";\n                &:HOVER{\n                    background-color: ", ";\n                    border: ", ";\n                }\n            }\n            &:HOVER{\n                background-color: ", ";\n                border: ", ";\n                box-shadow: 0 4px 5px rgba(0,0,0,0.1);\n            }\n        "], ["\n            font-size: 14px;\n            user-select: none;\n            border: ", ";\n            display: ", ";\n            width: ", ";\n            cursor: pointer;\n            border-radius: 200px;\n            background-color: ", ";\n            color: #fff;\n            text-align: center;\n            padding: 12px 20px;\n            font-weight: bold;\n            transition: all 0.3s;\n            &.big{\n                padding: 20px 44px;\n            }\n            &.disabled{\n                pointer-events: none;\n                opacity: 0.4;\n            }\n            &.light{\n                background-color: ", ";\n                border: ", ";\n            }\n            &.dark{\n                background-color: ", ";\n                border: ", ";\n                &:HOVER{\n                    background-color: ", ";\n                    border: ", ";\n                }\n            }\n            &.red{\n                background-color: ", ";\n                border: ", ";\n                &:HOVER{\n                    background-color: ", ";\n                    border: ", ";\n                }\n            }\n            &.green{\n                background-color: ", ";\n                border: ", ";\n                &:HOVER{\n                    background-color: ", ";\n                    border: ", ";\n                }\n            }\n            &.teal{\n                background-color: ", ";\n                border: ", ";\n                &:HOVER{\n                    background-color: ", ";\n                    border: ", ";\n                }\n            }\n            &:HOVER{\n                background-color: ", ";\n                border: ", ";\n                box-shadow: 0 4px 5px rgba(0,0,0,0.1);\n            }\n        "])), function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.brand[0]; }, function (props) { return props.block ? 'block' : 'inline-block'; }, function (props) { return props.block ? '100%' : 'unset'; }, function (props) { return props.filled ? props.theme.colors.brand[0] : 'transparent'; }, function (props) { return props.filled ? props.theme.colors.brand[1] : 'transparent'; }, function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.brand[1]; }, function (props) { return props.filled ? props.theme.colors.dark[0] : 'transparent'; }, function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.dark[0]; }, function (props) { return props.filled ? props.theme.colors.dark[2] : props.theme.colors.dark[2]; }, function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.dark[2]; }, function (props) { return props.filled ? props.theme.colors.red[1] : 'transparent'; }, function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.red[1]; }, function (props) { return props.filled ? props.theme.colors.red[3] : props.theme.colors.red[0]; }, function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.red[0]; }, function (props) { return props.filled ? props.theme.colors.green[1] : 'transparent'; }, function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.green[1]; }, function (props) { return props.filled ? props.theme.colors.green[2] : props.theme.colors.green[2]; }, function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.green[2]; }, function (props) { return props.filled ? props.theme.colors.teal[1] : 'transparent'; }, function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.teal[1]; }, function (props) { return props.filled ? props.theme.colors.teal[2] : props.theme.colors.teal[2]; }, function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.teal[2]; }, function (props) { return props.filled ? props.theme.colors.brand[2] : props.theme.colors.brand[0]; }, function (props) { return props.filled ? 'none' : '1px solid ' + props.theme.colors.brand[0]; });
        return _this;
    }
    Button.prototype.render = function () {
        var _this = this;
        var cfg = this.props.config;
        var class_names = "user_input button_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        var classes = [];
        if (this.props.dark) {
            classes.push('dark');
        }
        if (this.props.light) {
            classes.push('light');
        }
        if (this.props.red) {
            classes.push('red');
        }
        if (this.props.green) {
            classes.push('green');
        }
        if (this.props.teal) {
            classes.push('teal');
        }
        if (this.props.disabled) {
            classes.push('disabled');
        }
        if (this.props.big) {
            classes.push('big');
        }
        class_names += " " + classes.join(" ");
        return (React.createElement(this.container, { onMouseEnter: function () { return _this.props.onMouseEnter ? _this.props.onMouseEnter() : null; }, onMouseLeave: function () { return _this.props.onMouseEnter ? _this.props.onMouseLeave() : null; }, block: this.props.block, filled: this.props.filled, disabled: this.props.disabled || false, autoFocus: this.props.autofocus || false, className: class_names, onClick: function (e) { return _this.props.onClick ? _this.props.onClick() : null; } }, cfg.label));
    };
    return Button;
}(React.Component));
exports.default = Button;
var templateObject_1;

//# sourceMappingURL=Button.js.map
