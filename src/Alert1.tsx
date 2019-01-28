import * as React from 'react';
import userInputs, { UserInputProps, UserInputPromptConfig } from './module/index';
interface Alert1Props extends UserInputProps {
}
interface Alert1State {
    blocked: boolean;
}


class Alert1 extends React.Component<Alert1Props, Alert1State> {

    alert_prompt: UserInputPromptConfig = {
        title: "Title of alert prompt",
        message: "Message of alert prompt.",
        inputs: [
            {
                type: "text",
                key: "text_input_test",
                default_value: "",
                class_name: "alert_text_input_test_class"
            },
            {
                type: "button",
                key: "button_input_test",
                label: "button in alert",
                default_value: "",
                class_name: "alert_button_test_class",
                onClick: () => { console.log("button in alert click: userInputs.isOpen():", this.props.userInputs.isOpen()); }
            },
            {
                type: "select",
                key: "select_input_test",
                label: "Alert select label",
                default_value: 1,
                class_name: "alert_select_test_class",
                options: [
                    { label: "option 1", value: 1 },
                    { label: "option 2", value: 2 },
                    { label: "option 3", value: 3 },
                ]
            },
            {
                type: "multi_select",
                key: "multi_select_input_test",
                label: "Alert multi select label",
                default_value: [1, "3"],
                class_name: "alert_multi_select_test_class",
                searchable: true,
                options: [
                    { label: "option 1", value: 1 },
                    { label: "option 2", value: 2 },
                    { label: "option 3", value: "3" },
                    { label: "option 4", value: 4 },
                ]
            },
        ]
    };
    render() {
        return (
            <div
                onClick={() => {
                    this.props.userInputs.alert(this.alert_prompt, (values) => {
                        console.log("Alert Prompt values:", values);
                    });
                }}
            >
                Open Alert1
            </div>
        );
    }
}

export default userInputs(Alert1);