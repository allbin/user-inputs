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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var output_helpers_1 = require("output-helpers");
var translations_1 = require("./translations");
var PromptModal_1 = require("./PromptModal");
var TextInput_1 = require("./TextInput");
var BoolInput_1 = require("./BoolInput");
var GridInput_1 = require("./GridInput");
var Button_1 = require("./Button");
var valid_types = ["bool", "button", "confirm", "date", "grid", "number", "select", "text"];
//Add the translations of this repo to OH. Prefix: "user_input_hoc_".
output_helpers_1.default.addDictionary(translations_1.default);
var custom_components = {};
function getComponentWithInputs(input_configs, cb) {
    var InputWrapper = /** @class */ (function (_super) {
        __extends(InputWrapper, _super);
        function InputWrapper(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                values: input_configs.map(function (input) { return input.default_value; }),
                inputs: input_configs
            };
            _this.confirmCB = cb || null;
            _this.input_components = {
                text: TextInput_1.default,
                grid: GridInput_1.default,
                bool: BoolInput_1.default,
                button: Button_1.default,
                confirm: Button_1.default
            };
            return _this;
        }
        InputWrapper.prototype.getValues = function () {
            return this.state.values;
        };
        InputWrapper.prototype.resetValues = function () {
            var default_values = input_configs.map(function (input) { return input.default_value; });
            this.setState({ values: default_values });
        };
        InputWrapper.prototype.userConfirmedCB = function () {
            if (this.confirmCB) {
                this.confirmCB(this.state.values);
                this.confirmCB = null;
            }
        };
        InputWrapper.prototype.inputValueChangeCB = function (index, value) {
            var all_values = [].concat(this.state.values);
            all_values[index] = value;
            this.setState({
                values: all_values
            });
        };
        InputWrapper.prototype.renderInputs = function () {
            var _this = this;
            return this.state.inputs.map(function (input_request, index) {
                var InputComponent = _this.input_components[input_request.type];
                if (custom_components && custom_components.hasOwnProperty(input_request.type)) {
                    InputComponent = custom_components[input_request.type];
                }
                var input_component_props = input_request.props || {};
                if (input_request.type === "confirm") {
                    return React.createElement(InputComponent, __assign({ key: index, config: input_request, value: _this.state.values[index], onClick: function (value) {
                            _this.userConfirmedCB();
                        } }, input_component_props));
                }
                return React.createElement(InputComponent, __assign({ key: index, config: input_request, value: _this.state.values[index], onChange: function (value) {
                        if (input_request.onChange) {
                            input_request.onChange(value);
                        }
                        _this.inputValueChangeCB(index, value);
                    } }, input_component_props));
            });
        };
        InputWrapper.prototype.render = function () {
            return (React.createElement("div", null, this.renderInputs()));
        };
        return InputWrapper;
    }(React.Component));
    return InputWrapper;
}
function InputHOC(WrappedComponent) {
    var Prompt = /** @class */ (function (_super) {
        __extends(Prompt, _super);
        function Prompt(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                show: false,
                modal_props: {},
                values: []
            };
            _this.exports = {
                prompt: function (prompt_request, confirmCB, cancelCB) {
                    _this.initPrompt(prompt_request.inputs, prompt_request.props, confirmCB, cancelCB);
                },
                cancel: function () {
                    _this.cancelRequest();
                }
            };
            _this.confirmCB = null;
            _this.cancelCB = null;
            _this.input_components = {
                text: TextInput_1.default,
                grid: GridInput_1.default,
                bool: BoolInput_1.default
            };
            return _this;
        }
        Prompt.prototype.initPrompt = function (inputs, props, confirmCB, cancelCB) {
            var _this = this;
            var invalid_inputs = inputs.some(function (input) { return input.type === "button" || input.type === "confirm"; });
            if (invalid_inputs) {
                throw new Error("UserInput: Inputs of type 'button' OR 'confirm' are not allowed in prompt.");
            }
            invalid_inputs = inputs.some(function (input) { return input.hasOwnProperty("default_value") === false; });
            if (invalid_inputs) {
                throw new Error("UserInput: Inputs must be configured with a 'default_value'.");
            }
            invalid_inputs = inputs.some(function (input) { return !_this.input_components[input.type]; });
            if (invalid_inputs) {
                throw new Error("UserInput: Inputs must be configured with a valid 'type'. " + valid_types.join(','));
            }
            this.confirmCB = confirmCB || null;
            this.cancelCB = cancelCB || null;
            var values = inputs.map(function (input) { return input.default_value; });
            this.setState({
                show: true,
                modal_props: props,
                inputs: inputs,
                values: values
            });
        };
        Prompt.prototype.cancelRequest = function () {
            this.confirmCB = null;
            this.cancelCB = null;
            this.setState({
                show: false,
                inputs: [],
                values: []
            });
        };
        Prompt.prototype.userConfirmedCB = function () {
            this.setState({
                show: false
            });
            if (this.confirmCB) {
                this.confirmCB(this.state.values);
                this.confirmCB = null;
                this.cancelCB = null;
            }
        };
        Prompt.prototype.userCancelledCB = function () {
            this.setState({
                show: false
            });
            if (this.cancelCB) {
                this.cancelCB();
                this.cancelCB = null;
                this.confirmCB = null;
            }
        };
        Prompt.prototype.inputValueChangeCB = function (index, value) {
            var all_values = [].concat(this.state.values);
            all_values[index] = value;
            this.setState({
                values: all_values
            });
        };
        Prompt.prototype.renderInputs = function () {
            var _this = this;
            if (!this.state.inputs) {
                return null;
            }
            return this.state.inputs.map(function (input_request, index) {
                var InputComponent = _this.input_components[input_request.type];
                if (custom_components && custom_components.hasOwnProperty(input_request.type)) {
                    InputComponent = custom_components[input_request.type];
                }
                var input_component_props = input_request.props || {};
                return React.createElement(InputComponent, __assign({ key: index, config: input_request, value: _this.state.values[index], onChange: function (value) {
                        if (input_request.onChange) {
                            input_request.onChange(value);
                        }
                        _this.inputValueChangeCB(index, value);
                    } }, input_component_props));
            });
        };
        Prompt.prototype.renderPrompt = function () {
            var _this = this;
            if (!this.state.show) {
                return null;
            }
            var Modal = PromptModal_1.default;
            if (custom_components && custom_components.hasOwnProperty("modal")) {
                Modal = custom_components.modal;
            }
            return (React.createElement(Modal, __assign({ confirmCB: function () { _this.userConfirmedCB(); }, cancelCB: function () { _this.userCancelledCB(); }, renderInputs: function () { return _this.renderInputs(); } }, this.state.modal_props)));
        };
        Prompt.prototype.render = function () {
            return (React.createElement("div", null,
                React.createElement(WrappedComponent, __assign({ userPrompt: this.exports }, this.props)),
                this.renderPrompt()));
        };
        return Prompt;
    }(React.Component));
    return Prompt;
}
exports.InputHOC = InputHOC;
(function (InputHOC) {
    function setCustomComponents(object_with_components) {
        custom_components = object_with_components;
    }
    InputHOC.setCustomComponents = setCustomComponents;
    function generateInputs(input_configs, confirmCB) {
        if (input_configs.length < 1) {
            throw new Error("UserInput: GenerateInputs requires at least one input.");
        }
        if (!confirmCB) {
            var inputs_missing_cb = input_configs.filter(function (input) { return !input.onChange; });
            if (inputs_missing_cb.length > 0) {
                throw new Error("UserInput: GenerateInputs without a confirmCB requires every input to specify a onChange callback.");
            }
        }
        else {
            var confirm_buttons = input_configs.some(function (input) { return input.type === "confirm"; });
            if (!confirm_buttons) {
                throw new Error("UserInput: GenerateInputs with a confirmCB is required to have at least one input of type 'confirm'.");
            }
        }
        var invalid_inputs = input_configs.some(function (input) {
            return (input.type !== "confirm" && input.type !== "button") && input.hasOwnProperty("default_value") === false;
        });
        if (invalid_inputs) {
            throw new Error("UserInput: Every input that is not a 'button' or 'confirm' must be configured with a 'default_value'.");
        }
        invalid_inputs = input_configs.some(function (input) { return !valid_types.includes(input.type); });
        if (invalid_inputs) {
            throw new Error("UserInput: Inputs must be configured with a valid 'type'. " + valid_types.join(','));
        }
        var componentWithInputs = getComponentWithInputs(input_configs, confirmCB);
        return {
            getValues: function () { return componentWithInputs.getValues(); },
            reset: function () { },
            component: componentWithInputs
        };
    }
    InputHOC.generateInputs = generateInputs;
})(InputHOC = exports.InputHOC || (exports.InputHOC = {}));
exports.default = InputHOC;

//# sourceMappingURL=index.js.map
