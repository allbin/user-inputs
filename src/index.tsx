import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Main from './Main';
import StyledBase from './theme/StyledBase';


ReactDOM.render(
    <StyledBase>
        <Main
            required_test_prop={true}
        />
    </StyledBase>,
    document.getElementById('root') as HTMLElement
);
