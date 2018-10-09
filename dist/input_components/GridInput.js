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
var GridInput = /** @class */ (function (_super) {
    __extends(GridInput, _super);
    function GridInput(props) {
        var _this = _super.call(this, props) || this;
        _this.container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            text-align: left;\n            padding: 16px 20px !important;\n            p, .bool_block, .bool_input{\n                vertical-align: middle;\n                display: inline-block;\n            }\n            p{\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            .grid_block{\n                border-radius: 4px;\n                background-color: ", ";\n                padding: 4px;\n                display: grid;\n                grid-template-columns: ", ";\n                grid-gap: 4px 4px;\n            }\n        "], ["\n            text-align: left;\n            padding: 16px 20px !important;\n            p, .bool_block, .bool_input{\n                vertical-align: middle;\n                display: inline-block;\n            }\n            p{\n                color: ", ";\n                font-size: 14px;\n                margin-bottom: 12px;\n                font-weight: bold;\n            }\n            .grid_block{\n                border-radius: 4px;\n                background-color: ", ";\n                padding: 4px;\n                display: grid;\n                grid-template-columns: ", ";\n                grid-gap: 4px 4px;\n            }\n        "])), function (props) { return props.theme.colors.dark[1]; }, function (props) { return props.theme.colors.border; }, function (props) { return props.grid_type === 'colors' || props.grid_type === 'icons' ? 'repeat(6, 1fr)' : 'repeat( auto-fit, minmax(120px, 1fr) )'; });
        _this.gridItem = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            box-shadow: 0 2px 3px rgba(38, 38, 38, 0.12);\n            background-color: #fff;\n            cursor: pointer;\n            border-radius: 4px;\n            padding: ", ";\n            height: ", ";\n            text-align: center;\n            font-size: 16px;\n            &:HOVER{\n                background-color: ", ";\n                opacity: 0.5;\n                color: #fff;\n            }\n            &.active{\n                background-color: ", ";\n                color: #fff;\n                font-weight: bold;\n                &:HOVER{\n                    opacity: 1;\n                }\n            }\n            span{\n                display: ", ";\n            }\n            svg{\n                width: 30px;\n                height: 30px;\n            }\n        "], ["\n            box-shadow: 0 2px 3px rgba(38, 38, 38, 0.12);\n            background-color: #fff;\n            cursor: pointer;\n            border-radius: 4px;\n            padding: ", ";\n            height: ", ";\n            text-align: center;\n            font-size: 16px;\n            &:HOVER{\n                background-color: ", ";\n                opacity: 0.5;\n                color: #fff;\n            }\n            &.active{\n                background-color: ", ";\n                color: #fff;\n                font-weight: bold;\n                &:HOVER{\n                    opacity: 1;\n                }\n            }\n            span{\n                display: ", ";\n            }\n            svg{\n                width: 30px;\n                height: 30px;\n            }\n        "])), function (props) { return props.grid_type === 'icons' ? '6px 0' : '16px 0'; }, function (props) { return props.grid_type === 'colors' || props.grid_type === 'icons' ? '44px' : 'unset'; }, function (props) { return props.grid_type === 'colors' ? props.color : props.theme.colors.dark[1]; }, function (props) { return props.grid_type === 'colors' ? props.color : props.theme.colors.dark[1]; }, function (props) { return props.grid_type === 'colors' || props.grid_type === 'icons' ? 'none' : 'inline-block'; });
        return _this;
    }
    GridInput.prototype.render = function () {
        var _this = this;
        var cfg = this.props.config;
        var class_names = "user_input grid_input";
        if (cfg.class_name) {
            class_names += " " + cfg.class_name;
        }
        return (React.createElement(this.container, { grid_type: cfg.grid_type, className: class_names },
            cfg.label ? React.createElement("p", null, cfg.label) : null,
            React.createElement("div", { className: "grid_block" }, cfg.options.map(function (item, i) {
                return (React.createElement(_this.gridItem, { color: item.color, grid_type: cfg.grid_type, key: i, className: "grid_item " + (_this.props.value === item.value ? 'active' : ''), onClick: function () {
                        _this.props.onChange(item.value);
                    } }, cfg.grid_type === 'icons' ? null : React.createElement("span", null, item.label)));
            }))));
    };
    return GridInput;
}(React.Component));
exports.default = GridInput;
var templateObject_1, templateObject_2;

//# sourceMappingURL=GridInput.js.map
