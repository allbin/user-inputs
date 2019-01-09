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
declare const styled: any, css: any, createGlobalStyle: any, keyframes: any, ThemeProvider: any;
export { StyledComponent } from "styled-components";
export { css, createGlobalStyle, keyframes, ThemeProvider, ThemeInterface };
export default styled;
//# sourceMappingURL=styled.d.ts.map