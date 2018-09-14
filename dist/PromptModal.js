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
var output_helpers_1 = require("output-helpers");
var Button_1 = require("./Button");
//These are require because build engine doesn't like 'import ... .svg'.
var SymbolClone = require('./img/symbol_clone.svg');
var SymbolDelete = require('./img/symbol_delete.svg');
var SymbolArchive = require('./img/symbol_archive.svg');
var SymbolNewDoc = require('./img/symbol_new_doc.svg');
var SymbolNewFolder = require('./img/symbol_new_folder.svg');
var ConfirmModal = /** @class */ (function (_super) {
    __extends(ConfirmModal, _super);
    function ConfirmModal(props) {
        var _this = _super.call(this, props) || this;
        var modal_animate_down = styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            from {\n                transform: rotateX(1deg) translateY(-30px);\n            }\n            to {\n                opacity: 1;\n                transform: rotateX(0) translateY(0);\n            }\n        "], ["\n            from {\n                transform: rotateX(1deg) translateY(-30px);\n            }\n            to {\n                opacity: 1;\n                transform: rotateX(0) translateY(0);\n            }\n        "])));
        _this.container = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            .modal_container{\n                background-color: rgba(0,0,0,0.2);\n                display: block;\n                position: fixed;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                z-index: 20;\n                perspective: 45px;\n                .modal_box{\n                    transform-origin: center;\n                    animation: ", " 0.4s both;\n                    border-radius: 12px;\n                    background-color: #fff;\n                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);\n                    position: absolute;\n                    top: 100px;\n                    width: 500px;\n                    left: 0;\n                    right: 0;\n                    margin: auto;\n                    .modal_footer, .modal_title{\n                        text-align: center;\n                        left: 0;\n                        right: 0;\n                    }\n                    .modal_image{\n                        width: 500px;\n                        height: 300px;\n                        border-radius: 12px 12px 0 0;\n                    }\n                    .modal_title{\n                        margin: 20px 0 20px;\n                        font-weight: bold;\n                        text-align: center;\n                        font-size: 24px;\n                    }\n                    .modal_body{\n                        opacity: 0.6;\n                        text-align: center;\n                        margin: 12px 20px 28px;\n                        .user_input{\n                            margin-top: 12px;\n                        }\n                        .live_edit_section{\n                            margin-top: 20px;\n                        }\n                    }\n                    .modal_footer{\n                        padding: 20px;\n                        .modal_footer_left, .modal_footer_right{\n                            display: inline-block;\n                            width: 50%;\n                            white-space: nowrap;\n                            vertical-align: top;\n                            overflow: hidden;\n                        }\n                    }\n                }\n            }\n            .symbol{\n                margin: auto;\n                background-position: center;\n                background-size: contain;\n                background-repeat: no-repeat;\n                &.symbol_clone{\n                    background-image: url(", ");\n                }\n                &.symbol_archive{\n                    background-image: url(", ");\n                }\n                &.symbol_delete{\n                    background-image: url(", ");\n                }\n                &.symbol_new_doc{\n                    background-image: url(", ");\n                }\n                &.symbol_new_folder{\n                    background-image: url(", ");\n                }\n\n            }\n        "], ["\n            .modal_container{\n                background-color: rgba(0,0,0,0.2);\n                display: block;\n                position: fixed;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                z-index: 20;\n                perspective: 45px;\n                .modal_box{\n                    transform-origin: center;\n                    animation: ", " 0.4s both;\n                    border-radius: 12px;\n                    background-color: #fff;\n                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);\n                    position: absolute;\n                    top: 100px;\n                    width: 500px;\n                    left: 0;\n                    right: 0;\n                    margin: auto;\n                    .modal_footer, .modal_title{\n                        text-align: center;\n                        left: 0;\n                        right: 0;\n                    }\n                    .modal_image{\n                        width: 500px;\n                        height: 300px;\n                        border-radius: 12px 12px 0 0;\n                    }\n                    .modal_title{\n                        margin: 20px 0 20px;\n                        font-weight: bold;\n                        text-align: center;\n                        font-size: 24px;\n                    }\n                    .modal_body{\n                        opacity: 0.6;\n                        text-align: center;\n                        margin: 12px 20px 28px;\n                        .user_input{\n                            margin-top: 12px;\n                        }\n                        .live_edit_section{\n                            margin-top: 20px;\n                        }\n                    }\n                    .modal_footer{\n                        padding: 20px;\n                        .modal_footer_left, .modal_footer_right{\n                            display: inline-block;\n                            width: 50%;\n                            white-space: nowrap;\n                            vertical-align: top;\n                            overflow: hidden;\n                        }\n                    }\n                }\n            }\n            .symbol{\n                margin: auto;\n                background-position: center;\n                background-size: contain;\n                background-repeat: no-repeat;\n                &.symbol_clone{\n                    background-image: url(", ");\n                }\n                &.symbol_archive{\n                    background-image: url(", ");\n                }\n                &.symbol_delete{\n                    background-image: url(", ");\n                }\n                &.symbol_new_doc{\n                    background-image: url(", ");\n                }\n                &.symbol_new_folder{\n                    background-image: url(", ");\n                }\n\n            }\n        "])), modal_animate_down, SymbolClone, SymbolArchive, SymbolDelete, SymbolNewDoc, SymbolNewFolder);
        return _this;
    }
    ConfirmModal.prototype.render = function () {
        var _this = this;
        return (React.createElement(this.container, null,
            React.createElement("div", { className: "modal_container" },
                React.createElement("div", { className: "modal_box" },
                    this.props.class ?
                        React.createElement("div", { className: "modal_image symbol symbol_" + this.props.class }, " ")
                        :
                            null,
                    React.createElement("div", { className: "modal_title" }, this.props.title),
                    React.createElement("div", { className: "modal_body" },
                        this.props.message,
                        this.props.renderInputs()),
                    React.createElement("div", { className: "modal_footer" },
                        this.props.remove_cancel === true ?
                            null
                            :
                                React.createElement("div", { className: "modal_footer_left" },
                                    React.createElement(Button_1.default, { big: true, filled: true, config: {
                                            label: output_helpers_1.default.translate('user_input_hoc_cancel')
                                        }, onClick: function () { return _this.props.cancelCB(); } })),
                        React.createElement("div", { className: "modal_footer_left" },
                            React.createElement(Button_1.default, { big: true, filled: true, light: true, config: {
                                    label: output_helpers_1.default.translate('user_input_hoc_confirm')
                                }, onClick: function () { return _this.props.confirmCB(); } })))))));
    };
    return ConfirmModal;
}(React.Component));
exports.default = ConfirmModal;
var templateObject_1, templateObject_2;

//# sourceMappingURL=PromptModal.js.map
