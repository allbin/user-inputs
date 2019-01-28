import * as React from 'react';
import userInputs, { UserInputProps, FormInputConfigArray } from './module/index';
import styled from './module/styling';
interface Form1Props extends UserInputProps {
}
interface Form1State {
    blocked: boolean;
}

let DynamicContainer = styled.div `
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

class Alert1 extends React.Component<Form1Props, Form1State> {

    form_inputs: FormInputConfigArray = [
        {
            type: "text",
            key: "text_input_test_without_label",
            default_value: "",
            message: "Text input without label.",
            class_name: "alert_text_input_test_class"
        },
        {
            type: "button",
            key: "button_input_test",
            label: "button in form",
            default_value: "",
            class_name: "form_button_test_class",
            onClick: () => { console.log("button in form click: userInputs.isOpen():", this.props.userInputs.isOpen()); }
        },
        {
            type: "text",
            key: "text_input_test",
            default_value: "",
            label: "Text input with label and message",
            message: "This is a text input message",
            class_name: "alert_text_input_test_class"
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
            options: [
                { label: "option 1", value: 1 },
                { label: "option 2", value: 2 },
                { label: "option 3", value: "3" },
                { label: "option 4", value: 4 },
            ]
        },
        {
            type: "confirm",
            key: "confirm_input_test",
            label: "Confirm label",
            default_value: "",
            class_name: "confirm_button_test_class",
        },
    ];

    form = userInputs.generateForm(this.form_inputs, (values) => {
        console.log("confirm callback values:", values);
    });


    render() {
        return (
            <DynamicContainer>
                <p className="info">Form1: The following form is set in a dynamic container 50% width.</p>
                <this.form.component/>
            </DynamicContainer>
        );
    }
}

export default userInputs(Alert1);