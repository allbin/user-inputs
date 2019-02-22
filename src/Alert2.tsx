import * as React from 'react';
import userInputs, { UserInputProps, UserInputPromptConfig } from './module/index';
interface Alert1Props extends UserInputProps {
}
interface Alert1State {
    blocked: boolean;
}

const options_by_x: { [key: string]: any } = {
    a: [
        { value: "a-x", label: "a-x" },
        { value: "a-y", label: "a-y" },
        { value: "a-z", label: "a-z" },
    ],
    b: [
        { value: "b-x", label: "b-x" },
        { value: "b-y", label: "b-y" },
        { value: "b-z", label: "b-z" },
    ],
    c: [
        { value: "c-x", label: "c-x" },
        { value: "c-y", label: "c-y" },
        { value: "c-z", label: "c-z" },
    ]
};


class Alert2 extends React.Component<Alert1Props, Alert1State> {

    alert_prompt: UserInputPromptConfig = {
        title: "Dropdown dependency test",
        message: "Tests for using 'setConfig()' functionality of an alert.",
        inputs: [
            {
                type: "select",
                key: "select_input_test",
                label: "Alert select label",
                default_value: "a",
                class_name: "alert_select_test_class",
                options: [
                    { label: "option 1", value: "a" },
                    { label: "option 2", value: "b" },
                    { label: "option 3", value: "c" },
                ],
                onValueChange: (value: string|number) => {
                    //TODO: Why is 'value' not correctly infered as string|numer?
                    this.props.userInputs.setConfig({
                        key: "multi_select_input_test",
                        type: "multi_select",
                        options: options_by_x[value],
                        value: [],
                        default_value: []
                    });
                }
            },
            {
                type: "multi_select",
                key: "multi_select_input_test",
                label: "I am dependant on the select",
                placeholder: "Please select at least one option",
                default_value: [],
                class_name: "alert_multi_select_test_class",
                searchable: true,
                options: options_by_x['a'],
                validationCB: (values: any[]) => {
                    if (values.length > 0) {
                        return null;
                    }
                    return "At least one selection is required.";
                }
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
                Open Alert2
            </div>
        );
    }
}

export default userInputs(Alert2);
