import * as React from 'react';
import userInputs, { UserInputProps } from './module/index';
interface MainProps extends UserInputProps {

}
interface MainState {
    blocked: boolean;
}


class Main extends React.Component<MainProps, MainState> {

    render() {
        return (
            <div>
                MAIN

            </div>
        );
    }
}

export default userInputs(Main);