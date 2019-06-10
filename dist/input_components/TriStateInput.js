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
var TriStateInput = /** @class */ (function (_super) {
    __extends(TriStateInput, _super);
    function TriStateInput(props) {
        var _this = _super.call(this, props) || this;
        _this.container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            text-align: left;\n            p.multi_select_label {\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            .grid_block{\n                background-color: ", ";\n                text-align: center;\n                border-radius: 50px;\n                position: relative;\n                .grid_block_bg{\n                    background-color: ", ";\n                    position: absolute;\n                    border-radius: 50px;\n                    width: 33%;\n                    top: 0;\n                    bottom: 0;\n                    transition: all 0.4s;\n                }\n                .grid_item{\n                    position: relative;\n                    cursor: pointer;\n                    padding: 20px 0;\n                    font-size: 16px;\n                    display: inline-block;\n                    width: 33%;\n                    &.active{\n                        font-weight: bold;\n                        color: #fff;\n                    }\n                }\n            }\n        "], ["\n            text-align: left;\n            p.multi_select_label {\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            .grid_block{\n                background-color: ", ";\n                text-align: center;\n                border-radius: 50px;\n                position: relative;\n                .grid_block_bg{\n                    background-color: ", ";\n                    position: absolute;\n                    border-radius: 50px;\n                    width: 33%;\n                    top: 0;\n                    bottom: 0;\n                    transition: all 0.4s;\n                }\n                .grid_item{\n                    position: relative;\n                    cursor: pointer;\n                    padding: 20px 0;\n                    font-size: 16px;\n                    display: inline-block;\n                    width: 33%;\n                    &.active{\n                        font-weight: bold;\n                        color: #fff;\n                    }\n                }\n            }\n        "])), function (props) { return props.theme.colors.dark[1]; }, function (props) { return props.theme.colors.gray[3]; }, function (props) { return props.theme.colors.blue[1]; });
        return _this;
    }
    TriStateInput.prototype.render = function () {
        var _this = this;
        var cfg = this.props.config;
        var class_names = "user_input tri_state_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        var LEFT_POSITION = cfg.options.findIndex(function (option) { return option.value === _this.props.value; });
        return (React.createElement(this.container, { className: class_names },
            cfg.label ? React.createElement("p", { className: "multi_select_label" }, cfg.label) : null,
            React.createElement("div", { className: "grid_block" },
                React.createElement("div", { className: "grid_block_bg", style: { left: 33.333333333333 * LEFT_POSITION + '%' } }),
                cfg.options.map(function (item, i) {
                    return (React.createElement("div", { key: i, className: "grid_item " + (_this.props.value === item.value ? 'active' : ''), onClick: function () {
                            _this.props.onChange(item.value);
                        } },
                        React.createElement("span", null, item.label)));
                }))));
    };
    return TriStateInput;
}(React.Component));
exports.default = TriStateInput;
var templateObject_1;

//# sourceMappingURL=TriStateInput.js.map
