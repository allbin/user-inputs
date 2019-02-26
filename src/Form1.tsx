import * as React from 'react';
import userInputs, { UserInputProps, FormInputConfigArray } from './module/index';
import styled from './module/styling';
interface Form1Props extends UserInputProps {
}
interface Form1State {
    blocked: boolean;
}

let DynamicContainer = styled.div`
    position: relative;
    width: 50%;
    left: 50%;
    margin-left: -25%;
    p.info {
        display: block;
        margin-bottom: 40px;
        color: grey;
    }
`;

class Form1 extends React.Component<Form1Props, Form1State> {

    form_inputs: FormInputConfigArray = [
        {
            type: "text",
            key: "text_input_test_without_label",
            default_value: "",
            message: "Text input without label.",
            class_name: "form_text_input_test_class"
        },
        {
            type: "button",
            key: "button_input_test",
            label: "Reset form",
            default_value: "",
            class_name: "form_button_test_class",
            onClick: () => { this.form.reset(); }
        },
        {
            type: "text",
            key: "text_input_test",
            default_value: "",
            label: "Text input with label and message",
            message: "Please enter text. Maximum 6 characters long.",
            class_name: "form_text_input_test_class",
            validationCB: (value: string) => {
                if (value.length < 7) {
                    return null;
                }
                return "Value needs to be 6 or less characters long.";
            }
        },
        {
            type: "select",
            key: "select_input_test",
            label: "Form select label",
            default_value: 1,
            class_name: "form_select_test_class",
            options: [
                { label: "option 1", value: 1 },
                { label: "option 2", value: 2 },
                { label: "option 3", value: 3 },
            ]
        },
        {
            type: "multi_select",
            key: "multi_select_input_test",
            label: "Form multi select label",
            default_value: [1, "3"],
            class_name: "form_multi_select_test_class",
            searchable: true,
            styles: {
                option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                    return {
                        ...styles,
                        backgroundColor: data.value === 4 ? 'grey':''
                    };
                }
            },
            options: [
                { label: "option 1", value: 1 },
                { label: "option 2", value: 2 },
                { label: "option 3", value: "3" },
                { label: "option 4", value: 4 },
            ],
        },
        {
            type: "bool",
            key: "bool_input_test",
            label: "Form bool label",
            message: "This is a boolean input message text.",
            default_value: false,
            class_name: "form_boolean_test_class",
        },
        {
            key: "numeric_input_test",
            type: "numeric",
            number_type: "integer",
            default_value: 0,
            label: "Form numeric integer label",
            message: "Please enter an integer between 0 and 50.",
            min: 0,
            max: 50,
            class_name: "form_boolean_test_class",
        },
        {
            type: "textarea",
            key: "textarea_input_test",
            default_value: "",
            label: "Textarea input with 4 rows",
            rows: 4,
            message: "Only accepts 'a'.",
            class_name: "form_textarea_input_test_class",
            validationCB: (value: string) => {
                if (/^a+$/.test(value)) {
                    return null;
                }
                return "Value needs to be one or more 'a'.";
            }
        },
        {
            type: "button",
            key: "reset_confirm",
            label: "Reset confirmation clicked",
            default_value: "",
            class_name: "reset_confirm_button_test_class",
            onClick: () => {
                this.form.resetConfirmClick();
            }
        },
        {
            type: "button",
            key: "getvalues_test",
            label: "getValues() test",
            default_value: "",
            class_name: "reset_confirm_button_test_class",
            onClick: () => {
                console.log(this.form.getValues());
                this.props.userInputs.confirm({
                    title: "add tag",
                    message: "enter_new_tag",
                    inputs: [
                        {
                            type: "text",
                            key: "new_tag",
                            default_value: "",
                            validationCB: (value: string) => {
                                if (value.length > 0) {
                                    return null;
                                }
                                return "must_be_at_least_one_character";
                            }
                        }
                    ]
                }, (values) => {
                    console.log("form.getValues():", this.form.getValues());
                });
            }
        },
        {
            type: "confirm",
            key: "confirm_input_test",
            label: "Confirm label",
            default_value: "",
            class_name: "confirm_button_test_class",
        }
    ];

    form = userInputs.generateForm(this.form_inputs, (values) => {
        console.log("confirm callback values:", values);
    });

    render() {
        return (
            <DynamicContainer>
                <p className="info">Form1: The following form is set in a dynamic container 50% width.</p>
                <this.form.component />
            </DynamicContainer>
        );
    }
}

export default userInputs(Form1);