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
var BoolInput = /** @class */ (function (_super) {
    __extends(BoolInput, _super);
    function BoolInput(props) {
        var _this = _super.call(this, props) || this;
        var thing_size = '30px';
        _this.container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            text-align: left;\n            padding: 16px 20px !important;\n            p, .bool_block, .bool_input{\n                vertical-align: middle;\n                display: inline-block;\n            }\n            p{\n                color: ", ";\n                font-size: 14px;\n                font-weight: bold;\n                width: 60%;\n                overflow: hidden;\n            }\n            .bool_block{\n                width: 40%;\n                text-align: right;\n            }\n            .bool_input{\n                cursor: pointer;\n                border-radius: 100px;\n                width: 60px;\n                height: ", ";\n                position: relative;\n                border: 2px solid ", ";\n                background-color: ", ";\n                box-sizing: content-box;\n                transition: all 0.3s;\n                &:HOVER{\n                    border-color: ", ";\n                    .bool_input_thing{\n                        //background-color: ", ";\n                    }\n                    &.active{\n                        .bool_input_thing{\n                            //background-color: ", ";\n                        }\n                    }\n                }\n                &.active{\n                    background-color: ", ";\n                    .bool_input_thing{\n                        //background-color: ", ";\n                        left: ", ";\n                        top: 0;\n                    }\n                }\n                .bool_input_thing{\n                    transition: all 0.4s;\n                    position: absolute;\n                    left: 0;\n                    top: 0;\n                    background-color: #fff;\n                    box-shadow: 0 1px 4px rgba(0,0,0,0.5);\n                    border-radius: 50%;\n                    width: ", ";\n                    height: ", ";\n                }\n            }\n        "], ["\n            text-align: left;\n            padding: 16px 20px !important;\n            p, .bool_block, .bool_input{\n                vertical-align: middle;\n                display: inline-block;\n            }\n            p{\n                color: ", ";\n                font-size: 14px;\n                font-weight: bold;\n                width: 60%;\n                overflow: hidden;\n            }\n            .bool_block{\n                width: 40%;\n                text-align: right;\n            }\n            .bool_input{\n                cursor: pointer;\n                border-radius: 100px;\n                width: 60px;\n                height: ", ";\n                position: relative;\n                border: 2px solid ", ";\n                background-color: ", ";\n                box-sizing: content-box;\n                transition: all 0.3s;\n                &:HOVER{\n                    border-color: ", ";\n                    .bool_input_thing{\n                        //background-color: ", ";\n                    }\n                    &.active{\n                        .bool_input_thing{\n                            //background-color: ", ";\n                        }\n                    }\n                }\n                &.active{\n                    background-color: ", ";\n                    .bool_input_thing{\n                        //background-color: ", ";\n                        left: ", ";\n                        top: 0;\n                    }\n                }\n                .bool_input_thing{\n                    transition: all 0.4s;\n                    position: absolute;\n                    left: 0;\n                    top: 0;\n                    background-color: #fff;\n                    box-shadow: 0 1px 4px rgba(0,0,0,0.5);\n                    border-radius: 50%;\n                    width: ", ";\n                    height: ", ";\n                }\n            }\n        "])), function (props) { return props.theme.colors.dark[1]; }, thing_size, function (props) { return props.theme.colors.border; }, function (props) { return props.theme.colors.border; }, function (props) { return props.theme.colors.brand[2]; }, function (props) { return props.theme.colors.dark[2]; }, function (props) { return props.theme.colors.brand[2]; }, function (props) { return props.theme.colors.brand[1]; }, function (props) { return props.theme.colors.brand[1]; }, thing_size, thing_size, thing_size);
        return _this;
    }
    BoolInput.prototype.render = function () {
        var _this = this;
        var cfg = this.props.config;
        var class_names = "user_input bool_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        return (React.createElement(this.container, { className: class_names },
            cfg.label ? React.createElement("p", null, cfg.label) : null,
            React.createElement("div", { className: "bool_block" },
                React.createElement("div", { className: "bool_input " + (this.props.value === true ? 'active' : ''), onClick: function () {
                        _this.props.onChange(!_this.props.value);
                    } },
                    React.createElement("div", { className: "bool_input_thing" })))));
    };
    return BoolInput;
}(React.Component));
exports.default = BoolInput;
var templateObject_1;

//# sourceMappingURL=BoolInput.js.map
