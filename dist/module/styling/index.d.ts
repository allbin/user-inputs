/// <reference types="react" />
import * as styledComponents from "styled-components";
interface ThemeInterface {
    sizes: {
        general: {
            transition_time: number;
            input_radius: number;
            input_padding: string;
        };
    };
    colors: {
        brand: string[];
        disabled_input: string;
        text: string;
        border: string;
        background: string;
        gray: string[];
        dark: string[];
        red: string[];
        yellow: string[];
        green: string[];
        teal: string[];
    };
}
declare const styled: styledComponents.ThemedBaseStyledInterface<ThemeInterface>, css: styledComponents.BaseThemedCssFunction<ThemeInterface>, createGlobalStyle: <P extends object = {}>(first: TemplateStringsArray | styledComponents.CSSObject | styledComponents.InterpolationFunction<styledComponents.ThemedStyledProps<P, ThemeInterface>>, ...interpolations: styledComponents.Interpolation<styledComponents.ThemedStyledProps<P, ThemeInterface>>[]) => styledComponents.GlobalStyleComponent<P, ThemeInterface>, keyframes: (strings: TemplateStringsArray | styledComponents.CSSKeyframes, ...interpolations: styledComponents.SimpleInterpolation[]) => styledComponents.Keyframes, ThemeProvider: import("react").ComponentClass<styledComponents.ThemeProviderProps<ThemeInterface, ThemeInterface>, any>;
export { StyledComponent } from "styled-components";
export { css, createGlobalStyle, keyframes, ThemeProvider, ThemeInterface };
export default styled;
