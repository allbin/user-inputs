import * as React from 'react';
import userInputs, { UserInputProps } from './module/index';
import Alert1 from './Alert1';
import Alert2 from './Alert2';
import Confirm1 from './Confirm1';
import Form1 from './Form1';
import styled from './module/styling';
interface MainProps extends UserInputProps {
    required_test_prop: boolean;
}
interface MainState {
    blocked: boolean;
}

let Divider = styled.div`
    margin-top: 40px;
    border-bottom: 2px solid black;
    margin-bottom: 40px;
`;

class Main extends React.Component<MainProps, MainState> {


    render() {

        return (
            <div>
                MAIN
                <Divider />
                <Alert1 />
                <Alert2 />
                <Confirm1 />
                <Divider />
                <Form1 />
            </div>
        );
    }
}

export default userInputs(Main);
