import * as React from 'react';
import userInputs, { UserInputProps, UserInputPromptConfig } from './module/index';
interface MainProps extends UserInputProps {
    required_test_prop: boolean;
}
interface MainState {
    blocked: boolean;
}


class Main extends React.Component<MainProps, MainState> {

    alert_prompt: UserInputPromptConfig = {
        title: "Title of Alert prompt",
        inputs: [{
            type: "text",
            key: "text_input_test",
            default_value: "",
            class_name: "text_input_test_class"
        }]
    };
    render() {

        return (
            <div>
                MAIN
                <div
                    onClick={() => {
                        this.props.userInputs.alert(this.alert_prompt, (values) => {
                            console.log("Alert Prompt values:", values);
                        });
                    }}
                >
                    Open Alert
                </div>
            </div>
        );
    }
}

export default userInputs(Main);