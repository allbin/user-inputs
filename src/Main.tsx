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
        prompt_props: {
            title: "Title of Alert prompt."
        },
        inputs: [{
            key: "text-input",
            type: "text",
            default_value: ""
        }]
    };
    render() {

        return (
            <div>
                MAIN
                <div
                    onClick={() => {

                    }}
                >
                    Open Alert
                </div>
            </div>
        );
    }
}

export default userInputs(Main);