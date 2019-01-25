export default `
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #E6E9F2;
        color: #252424;
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }
    ol, ul {
        list-style: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    a {
        color: inherit;
        text-decoration: none;
        &:VISITED{
            color: inherit;
        }
    }
    html{
        padding: 0;
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }
    em{
        font-style: italic;
    }
    strong{
        font-weight: bold;
    }
    input{
        &:FOCUS{
            outline: none;
        }
    }
    .Select{
        .Select-control{
            border-color: #CED9EE;
        }
    }
    .Select-option{
        &:HOVER{
            color: #fff;
            background-color: #5D92F1;
        }
    }
    b{
        font-weight: bold;
    }
    .debug{
        font-size: 12px;
        opacity: 0.6;
    }
`;
