import * as React from 'react';
import oh from 'output-helpers';
import translations from './translations';
import formGenerator, { validateFormGeneratorInputs } from './formGenerator';
import PromptModal from './PromptModal';
import * as TextImport from './input_components/TextInput';
import * as BoolImport from './input_components/BoolInput';
import * as GridImport from './input_components/GridInput';
import * as SelectImport from './input_components/SelectInput';
import * as MultiSelectImport from './input_components/MultiSelectInput';
import * as TextareaImport from './input_components/TextareaInput';
import * as TriStateImport from './input_components/TriStateInput';
import * as NumericImport from './input_components/NumericInput';
import * as ButtonImport from './input_components/Button';
export let valid_types = ["bool", "button", "confirm", "date", "grid", "numeric", "multi_select", "select", "text", "textarea", "tri_state"];
//Add translations of this repo to OH. Prefixed with "user_input_".
oh.addDictionary(translations);
export const input_imports = {
    text: TextImport,
    bool: BoolImport,
    grid: GridImport,
    button: ButtonImport,
    select: SelectImport,
    multi_select: MultiSelectImport,
    textarea: TextareaImport,
    tri_state: TriStateImport,
    confirm: ButtonImport,
    numeric: NumericImport,
    date: TextImport
};
export function renderPrompt(form, prompt_config, userCancelledCB) {
    if (!form || !prompt_config) {
        return null;
    }
    return (React.createElement(PromptModal, { cancelCB: () => { userCancelledCB(); }, config: prompt_config, form: form }));
}
export function InputHOC(WrappedComponent) {
    class Prompt extends React.Component {
        constructor(props) {
            super(props);
            this.exports = {
                confirm: (user_prompt_request, confirmCB, cancelCB) => {
                    if (user_prompt_request.hasOwnProperty("inputs") === false) {
                        user_prompt_request.inputs = [];
                    }
                    if (!user_prompt_request.title) {
                        throw new Error("prompt_props requires 'title' property.");
                    }
                    let default_settings = {
                        show_cancel_btn: true,
                        show_confirm_btn: true
                    };
                    let prompt_request = Object.assign({}, user_prompt_request, default_settings);
                    this.initPrompt(prompt_request, confirmCB, cancelCB);
                },
                alert: (user_prompt_request, confirmCB) => {
                    if (user_prompt_request.hasOwnProperty("inputs") === false) {
                        user_prompt_request.inputs = [];
                    }
                    if (!user_prompt_request.title) {
                        throw new Error("prompt_props requires 'title' property.");
                    }
                    let default_settings = {
                        show_cancel_btn: false,
                        show_confirm_btn: true
                    };
                    let prompt_request = Object.assign({}, user_prompt_request, default_settings);
                    this.initPrompt(prompt_request, confirmCB);
                },
                cancel: () => {
                    this.resetPrompt();
                },
                isOpen: () => {
                    return this.state.prompt_config !== null;
                },
                setTag: (tag) => {
                    this.setState({
                        tag: tag
                    });
                },
                getTag: () => {
                    return this.state.tag;
                },
                setConfig: (input_config) => {
                    if (this.state.form) {
                        this.state.form.setInputConfig(input_config);
                    }
                    else {
                        throw new Error("UserInput: Cannot setConfig without an open prompt.");
                    }
                }
            };
            this.confirmCB = null;
            this.cancelCB = null;
            this.state = {
                prompt_config: null,
                form: null,
                tag: null
            };
        }
        initPrompt(prompt_config, confirmCB, cancelCB) {
            let inputs = [...prompt_config.inputs];
            let invalid_inputs = inputs.some(input => input.hasOwnProperty("default_value") === false);
            if (invalid_inputs) {
                throw new Error("UserInput: Inputs must be configured with a 'default_value'.");
            }
            invalid_inputs = inputs.some(input => !input_imports[input.type]);
            if (invalid_inputs) {
                throw new Error("UserInput: Inputs must be configured with a valid 'type'. " + valid_types.join(','));
            }
            this.confirmCB = confirmCB || null;
            this.cancelCB = cancelCB || null;
            if (prompt_config.show_confirm_btn) {
                let confirm_config = {
                    label: prompt_config.confirm_button_label || oh.translate('user_input_confirm'),
                    key: "confirm",
                    type: "confirm",
                    default_value: "",
                    filled: true,
                    big: true
                };
                inputs.push(confirm_config);
            }
            if (prompt_config.show_cancel_btn) {
                let cancel_config = {
                    label: prompt_config.confirm_button_label || oh.translate('user_input_cancel'),
                    key: "cancel",
                    type: "button",
                    default_value: "",
                    onClick: () => this.userCancelledCB(),
                    filled: true,
                    big: true
                };
                inputs.push(cancel_config);
            }
            this.setState({
                form: formGenerator(inputs, (values) => this.userConfirmedCB(values)),
                prompt_config: prompt_config
            });
        }
        resetPrompt() {
            this.confirmCB = null;
            this.cancelCB = null;
            this.setState({
                form: null,
                prompt_config: null,
                tag: null
            });
        }
        userConfirmedCB(values) {
            //User clicked the confirm button.
            if (this.confirmCB) {
                this.confirmCB(values);
            }
            this.resetPrompt();
        }
        userCancelledCB() {
            //User clicked the cancel button.
            if (this.cancelCB) {
                //Exec the cancelCB if one was supplied.
                this.cancelCB();
            }
            this.resetPrompt();
        }
        render() {
            return (React.createElement("div", null,
                React.createElement(WrappedComponent, Object.assign({ userInputs: this.exports }, this.props)),
                renderPrompt(this.state.form, this.state.prompt_config, () => { this.userCancelledCB(); })));
        }
    }
    return Prompt;
}
(function (InputHOC) {
    function generateForm(input_configs, confirmCB) {
        validateFormGeneratorInputs(input_configs, confirmCB);
        return formGenerator(input_configs, confirmCB);
    }
    InputHOC.generateForm = generateForm;
})(InputHOC || (InputHOC = {}));
export default InputHOC;

//# sourceMappingURL=index.js.map
