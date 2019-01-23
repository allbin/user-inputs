import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

interface ThemeInterface {
    sizes: {
        general: {
            transition_time: number,
            input_radius: number,
            input_padding: string
        }
    };
    colors: {
        brand: string[],
        disabled_input: string;
        text: string
        border: string,
        background: string;
        gray: string[],
        dark: string[],
        red: string[],
        yellow: string[],
        green: string[],
        teal: string[]
    };
}

const {
    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export { StyledComponent } from "styled-components";

export {
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider,
    ThemeInterface
};
export default styled;