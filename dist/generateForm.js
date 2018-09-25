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
            input_configs.forEach(function (input) { return values[input.key] = input.default_value; });
            _this.state = {
                values: values,
                inputs: input_configs
            };
            _this.confirmCB = cb || null;
            _this.input_components = {
                text: default_components.text,
                grid: default_components.grid,
                bool: default_components.bool,
                button: default_components.button,
                confirm: default_components.button
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
                throw new Error("UserInput: Key not found in existing inputs. Key must match an input created with 'generateInputs()'.");
            }
            var values = this.state.values;
            if (input_config.hasOwnProperty("value")) {
                values[input_config.key] = input_config.value;
            }
            inputs[input_index] = Object.assign({}, inputs[input_index], input_config);
            this.setState({
                inputs: inputs,
                values: values
            });
        };
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
        InputWrapper.prototype.inputValueChangeCB = function (key, value) {
            var values = Object.assign({}, this.props.values);
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
    return {
        component: InputWrapper,
        reset: function () {
            mounted_forms.forEach(function (form) {
                form.resetValues();
            });
        },
        getValues: function () {
            mounted_forms.forEach(function (form) {
                form.getValues();
            });
        },
        setInputConfig: function (updated_configs) {
            var inputs = input_configs;
            var input_index = inputs.findIndex(function (input) { return input.key === updated_configs.key; });
            if (input_index < 0) {
                throw new Error("UserInput: Key not found in existing inputs. Key must match an input created with 'generateInputs()'.");
            }
            inputs[input_index] = Object.assign({}, inputs[input_index], updated_configs);
            mounted_forms.forEach(function (form) {
                form.setConfig(updated_configs);
            });
        }
    };
}
exports.getInputForm = getInputForm;

//# sourceMappingURL=generateForm.js.map
