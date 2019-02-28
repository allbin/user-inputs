import * as React from 'react';
import userInputs, { UserInputProps, UserInputPromptConfig } from './module/index';
interface Alert1Props extends UserInputProps {
}
interface Alert1State {
    blocked: boolean;
}


class Confirm1 extends React.Component<Alert1Props, Alert1State> {

    confirm_prompt: UserInputPromptConfig = {
        title: "Title of confirm1 prompt",
        message: "Message of confirm1 prompt.",
        inputs: [
            {
                type: "text",
                key: "text_input_test",
                default_value: "",
            },
            {
                type: "button",
                key: "button_input_test",
                label: "button in confirm1",
                default_value: "",
                onClick: () => { console.log("button in confirm1 click: userInputs.isOpen():", this.props.userInputs.isOpen()); }
            },
            {
                type: "select",
                key: "select_input_test",
                label: "Confirm1 select label",
                default_value: 1,
                options: [
                    { label: "option 1", value: 1 },
                    { label: "option 2", value: 2 },
                    { label: "option 3", value: 3 },
                ]
            },
            {
                type: "multi_select",
                key: "multi_select_input_test",
                label: "Confirm1 multi select label",
                default_value: [1, "3"],
                searchable: true,
                options: [
                    { label: "option 1", value: 1 },
                    { label: "option 2", value: 2 },
                    { label: "option 3", value: "3" },
                    { label: "option 4", value: 4 },
                ],
                validationCB: (value: any[]) => {
                    return value.length === 2 ? null : "Select exactly two options.";
                }
            },
        ]
    };
    render() {
        return (
            <div
                onClick={() => {
                    this.props.userInputs.confirm(this.confirm_prompt, (values) => {
                        console.log("Confirm1 Prompt values:", values);
                    });
                }}
            >
                Open Confirm1
            </div>
        );
    }
}

export default userInputs(Confirm1);
