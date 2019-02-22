/// <reference types="react" />
import * as styledComponents from "styled-components";
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
        };
    };
    components: {
        button: {
            radius: number;
            shadow: string;
            hover_shadow: string;
            height: number;
        };
        form: {
            user_input: {
                margin_bottom: number;
            };
        };
        modal: {
            border_radius: number;
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
        truncate: string;
    };
}
declare const styled: styledComponents.ThemedBaseStyledInterface<ThemeInterface>, css: styledComponents.BaseThemedCssFunction<ThemeInterface>, createGlobalStyle: <P extends object = {}>(first: TemplateStringsArray | styledComponents.CSSObject | styledComponents.InterpolationFunction<styledComponents.ThemedStyledProps<P, ThemeInterface>>, ...interpolations: styledComponents.Interpolation<styledComponents.ThemedStyledProps<P, ThemeInterface>>[]) => styledComponents.GlobalStyleComponent<P, ThemeInterface>, keyframes: (strings: TemplateStringsArray | styledComponents.CSSKeyframes, ...interpolations: styledComponents.SimpleInterpolation[]) => styledComponents.Keyframes, ThemeProvider: import("react").ComponentClass<styledComponents.ThemeProviderProps<ThemeInterface, ThemeInterface>, any>;
export { StyledComponent } from "styled-components";
export { css, createGlobalStyle, keyframes, ThemeProvider, ThemeInterface };
export default styled;
