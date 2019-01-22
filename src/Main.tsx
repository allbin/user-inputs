import * as React from 'react';
import withStore, { WithStoreProps } from './store';

interface MainProps extends WithStoreProps {

}
interface MainState {
    blocked: boolean;
}


class Main extends React.Component<MainProps, MainState> {

    render() {
        return (
            <div>
                MAIN
                <div>num: {this.props.store.example_one.num}</div>
                <div>isPositive: {this.props.store_ext.numIsPositive() ? "true" : "false" }</div>
            </div>
        );
    }
}

export default withStore(Main);