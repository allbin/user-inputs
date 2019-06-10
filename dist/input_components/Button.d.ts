import * as React from 'react';
export interface ButtonConfig {
    label: string;
    class_name?: string;
}
export interface ButtonProps {
    config: ButtonConfig;
    dark?: boolean;
    light?: boolean;
    red?: boolean;
    green?: boolean;
    teal?: boolean;
    disabled?: boolean;
    big?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    block?: boolean;
    filled?: boolean;
    onClick: () => void;
    autofocus?: boolean;
}
export default class Button extends React.Component<ButtonProps, any> {
    container: any;
    constructor(props: any);
    render(): JSX.Element;
}
//# sourceMappingURL=Button.d.ts.map