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
var formGenerator = require("./formGenerator");
var PromptModal_1 = require("./PromptModal");
var TextInput_1 = require("./input_components/TextInput");
var BoolInput_1 = require("./input_components/BoolInput");
var GridInput_1 = require("./input_components/GridInput");
var Button_1 = require("./input_components/Button");
var valid_types = ["bool", "button", "confirm", "date", "grid", "number", "multi_select", "select", "text", "textarea"];
//Add translations of this repo to OH. Prefix: "user_input_hoc_".
output_helpers_1.default.addDictionary(translations_1.default);
var default_components = {
    text: TextInput_1.default,
    bool: BoolInput_1.default,
    grid: GridInput_1.default,
    button: Button_1.default,
    select: TextInput_1.default,
    multi_select: TextInput_1.default,
    textarea: TextInput_1.default,
};
var custom_components = {};
function InputHOC(WrappedComponent) {
    var Prompt = /** @class */ (function (_super) {
        __extends(Prompt, _super);
        function Prompt(props) {
            var _this = _super.call(this, props) || this;
            _this.state = {
                show: false,
                modal_props: {},
                values: {},
                prompt_request: null,
                tag: null
            };
            _this.exports = {
                confirm: function (prompt_request, confirmCB, cancelCB) {
                    if (prompt_request.hasOwnProperty("inputs") === false) {
                        prompt_request.inputs = [];
                    }
                    if (prompt_request.hasOwnProperty("props") === false) {
                        prompt_request.props = {};
                    }
                    prompt_request.props.show_cancel_btn = true;
                    _this.initPrompt(prompt_request, confirmCB, cancelCB);
                },
                alert: function (prompt_request, confirmCB) {
                    if (prompt_request.hasOwnProperty("inputs") === false) {
                        prompt_request.inputs = [];
                    }
                    if (prompt_request.hasOwnProperty("props") === false) {
                        prompt_request.props = {};
                    }
                    prompt_request.props.show_cancel_btn = false;
                    _this.initPrompt(prompt_request, confirmCB);
                },
                cancel: function () {
                    _this.cancelRequest();
                },
                isOpen: function () {
                    return _this.state.show;
                },
                setConfig: function (input_config) {
                    if (input_config.hasOwnProperty("key") === false) {
                        throw new Error("UserInput: input_config must contain 'key' property.");
                    }
                    var inputs = _this.state.inputs;
                    var input_index = inputs.findIndex(function (input) { return input.key === input_config.key; });
                    if (input_index < 0) {
                        throw new Error("UserInput: Key not found in existing inputs. Key must match an input created with 'promp()'.");
                    }
                    var values = _this.state.values;
                    if (input_config.hasOwnProperty("value")) {
                        values[input_config.key] = input_config.value;
                    }
                    inputs[input_index] = Object.assign({}, inputs[input_index], input_config);
                    _this.setState({
                        inputs: inputs,
                        values: values
                    });
                }
            };
            _this.confirmCB = null;
            _this.cancelCB = null;
            _this.input_components = {
                text: TextInput_1.default,
                grid: GridInput_1.default,
                bool: BoolInput_1.default,
                select: TextInput_1.default,
                multi_select: TextInput_1.default,
                textarea: TextInput_1.default
            };
            return _this;
        }
        Prompt.prototype.initPrompt = function (prompt_request, confirmCB, cancelCB) {
            var _this = this;
            var inputs = prompt_request.inputs;
            var props = prompt_request.props;
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
            var values = {};
            inputs.forEach(function (input) { return values[input.key] = input.default_value; });
            this.setState({
                show: true,
                modal_props: props,
                inputs: inputs,
                values: values,
                prompt_request: prompt_request
            });
        };
        Prompt.prototype.cancelRequest = function () {
            this.confirmCB = null;
            this.cancelCB = null;
            this.setState({
                show: false,
                inputs: [],
                values: [],
                prompt_request: null,
                tag: null
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
        Prompt.prototype.inputValueChangeCB = function (key, value) {
            var values = Object.assign({}, this.state.values);
            values[key] = value;
            this.setState({
                values: values
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
                var key = input_request.key || "input_" + index;
                return React.createElement(InputComponent, __assign({ key: key, config: input_request, value: _this.state.values[key], onChange: function (value) {
                        if (input_request.onChange) {
                            input_request.onChange(value);
                        }
                        _this.inputValueChangeCB(key, value);
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
    function generateForm(input_configs, confirmCB) {
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
        invalid_inputs = input_configs.some(function (input) { return (input.type !== 'button' && input.type !== 'confirm') && !input.hasOwnProperty('key'); });
        if (invalid_inputs) {
            throw new Error("UserInput: Inputs that are not type 'button' or 'confirm' must be configured with a 'key' property. ");
        }
        return formGenerator.getInputForm(default_components, custom_components, input_configs, confirmCB);
    }
    InputHOC.generateForm = generateForm;
})(InputHOC = exports.InputHOC || (exports.InputHOC = {}));
exports.default = InputHOC;

//# sourceMappingURL=index.js.map
