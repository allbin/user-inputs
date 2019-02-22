import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

interface ThemeInterface {
    sizes: {
        padding: {
            horizontal: number;
        };
        fonts: {
            big: number;
            medium: number;
            small: number;
            tiny: number;
        };
        panel: {
            height: number;
        }
    };
    components: {
        left_panel: {
            shadow: string;
            width: number;
        };
        right_panel: {
          shadow: string;
          width: number;
        };
        device_list: {
            sort_container: {
                height: number;
            };
        };
        button: {
          radius: number;
          shadow: string;
          hover_shadow: string;
      };
    };
    colors: {
        brand: string[];
        disabled_input: string;
        text: string;
        subtitle: string;
        border: string;
        background: string;
        error: string;
        gray: string[];
        dark: string[];
        red: string[];
        yellow: string[];
        green: string[];
        teal: string[];
    };
    mixins: {
      truncate: string
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
