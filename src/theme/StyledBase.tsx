import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import reset from './reset';
import theme from './main';
const GlobalStyle = createGlobalStyle`${reset}`;

class StyledBase extends React.Component<any, any> {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <GlobalStyle />
                    {this.props.children}
                </div>
            </ThemeProvider>
        );
    }
}

export default StyledBase;