import * as React from 'react';
import userInputs, { UserInputProps } from './module/index';
import Alert1 from './Alert1';
interface MainProps extends UserInputProps {
    required_test_prop: boolean;
}
interface MainState {
    blocked: boolean;
}


class Main extends React.Component<MainProps, MainState> {


    render() {

        return (
            <div>
                MAIN
                <Alert1 />
            </div>
        );
    }
}

export default userInputs(Main);