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
function getInputForm(default_components, custom_components, input_configs, cb) {
    var mounted_forms = [];
    var InputWrapper = /** @class */ (function (_super) {
        __extends(InputWrapper, _super);
        function InputWrapper(props) {
            var _this = _super.call(this, props) || this;
            var values = {};
            input_configs.forEach(function (input) {
                if (input.type === "multi_select") {
                    var selected_options = input.options.filter(function (option) { return input.default_value.includes(option.value); });
                    if (selected_options.length !== input.default_value.length) {
                        throw new Error("UserInput: Default values for multiselect not present in options.");
                    }
                    values[input.key] = selected_options;
                }
                else if (input.type === "select") {
                    var selected_option = input.options.find(function (option) { return input.default_value === option.value; });
                    if (!selected_option) {
                        throw new Error("UserInput: Default value for select not present in options.");
                    }
                    values[input.key] = selected_option;
                }
                else {
                    values[input.key] = input.default_value;
                }
            });
            _this.state = {
                values: values,
                inputs: input_configs,
                prompt_request: null,
                tag: null
            };
            _this.confirmCB = cb || null;
            _this.input_components = {
                text: default_components.text,
                textarea: default_components.textarea,
                grid: default_components.grid,
                bool: default_components.bool,
                multi_select: default_components.multi_select,
                select: default_components.select,
                button: default_components.button,
                confirm: default_components.button,
                tri_state: default_components.tri_state
            };
            return _this;
        }
        InputWrapper.prototype.componentDidMount = function () {
            mounted_forms.push(this);
        };
        InputWrapper.prototype.componentWillUnmount = function () {
            var _this = this;
            var mount_index = mounted_forms.findIndex(function (form) { return form === _this; });
            mounted_forms.splice(mount_index, 1);
        };
        InputWrapper.prototype.setConfig = function (input_config) {
            var inputs = this.state.inputs;
            var input_index = inputs.findIndex(function (input) { return input.key === input_config.key; });
            if (input_index < 0) {
                throw new Error("UserInput: Key not found in existing inputs. Key must match an input created with 'generateForm()'.");
            }
            var values = this.state.values;
            if (input_config.hasOwnProperty("value")) {
                if (input_config.type === "multi_select") {
                    var selected_options = input_config.options.filter(function (option) { return input_config.value.includes(option.value); });
                    if (selected_options.length !== input_config.value.length) {
                        throw new Error("UserInput: Values for multiselect not present in options.");
                    }
                    values[input_config.key] = selected_options;
                }
                else if (input_config.type === "select") {
                    var selected_option = input_config.options.find(function (option) { return input_config.value === option.value; });
                    if (!selected_option) {
                        throw new Error("UserInput: Value for select not present in options.");
                    }
                    values[input_config.key] = selected_option;
                }
                else {
                    values[input_config.key] = input_config.value;
                }
            }
            inputs[input_index] = Object.assign({}, inputs[input_index], input_config);
            this.setState({
                inputs: inputs,
                values: values
            });
        };
        InputWrapper.prototype.getValues = function () {
            var values = Object.assign({}, this.state.values);
            this.state.inputs.forEach(function (input) {
                if ((input.type === "text" || input.type === "textarea") && (!input.hasOwnProperty("trim") || input.trim === true)) {
                    if (typeof values[input.key] === "string") {
                        values[input.key] = values[input.key].trim();
                    }
                }
                if (input.type === "select") {
                    values[input.key] = values[input.key].value;
                }
                if (input.type === "multi_select") {
                    values[input.key] = values[input.key].map(function (option) { return option.value; });
                }
            });
            return values;
        };
        InputWrapper.prototype.resetValues = function () {
            var default_values = input_configs.map(function (input) { return input.default_value; });
            this.setState({ values: default_values });
        };
        InputWrapper.prototype.userConfirmedCB = function () {
            var values = Object.assign({}, this.state.values);
            this.state.inputs.forEach(function (input) {
                if ((input.type === "text" || input.type === "textarea") && (!input.hasOwnProperty("trim") || input.trim === true)) {
                    if (typeof values[input.key] === "string") {
                        values[input.key] = values[input.key].trim();
                    }
                }
                if (input.type === "select") {
                    values[input.key] = values[input.key].value;
                }
                if (input.type === "multi_select") {
                    values[input.key] = values[input.key].map(function (option) { return option.value; });
                }
            });
            if (this.confirmCB) {
                this.confirmCB(values);
                this.confirmCB = null;
            }
        };
        InputWrapper.prototype.inputValueChangeCB = function (key, value) {
            var values = Object.assign({}, this.state.values);
            values[key] = value;
            this.setState({
                values: values
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
                var key = input_request.key || "input_" + index;
                if (input_request.type === "confirm") {
                    return React.createElement(InputComponent, __assign({ key: key, config: input_request, value: _this.state.values[key], onClick: function (value) {
                            _this.userConfirmedCB();
                        } }, input_component_props));
                }
                return React.createElement(InputComponent, __assign({ key: key, config: input_request, value: _this.state.values[key], onChange: function (value) {
                        if (input_request.onChange) {
                            input_request.onChange(value);
                        }
                        _this.inputValueChangeCB(key, value);
                    } }, input_component_props));
            });
        };
        InputWrapper.prototype.render = function () {
            return (React.createElement("div", null, this.renderInputs()));
        };
        return InputWrapper;
    }(React.Component));
    return {
        component: InputWrapper,
        reset: function () {
            mounted_forms.forEach(function (form) {
                form.resetValues();
            });
        },
        getForms: function () {
            return mounted_forms;
        },
        getValues: function () {
            return mounted_forms.map(function (form) {
                return {
                    values: form.getValues(),
                    ref: form
                };
            });
        },
        setInputConfig: function (updated_config) {
            if (updated_config.hasOwnProperty("key") === false) {
                throw new Error("UserInput: input_config must contain 'key' property.");
            }
            var inputs = input_configs;
            var input_index = inputs.findIndex(function (input) { return input.key === updated_config.key; });
            if (input_index < 0) {
                throw new Error("UserInput: Key not found in existing inputs. Key must match an input created with 'generateForm()'.");
            }
            inputs[input_index] = Object.assign({}, inputs[input_index], updated_config);
            mounted_forms.forEach(function (form) {
                form.setConfig(inputs[input_index]);
            });
        }
    };
}
exports.getInputForm = getInputForm;

//# sourceMappingURL=formGenerator.js.map
