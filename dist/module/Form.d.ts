import * as React from 'react';
import { FormInputConfigArray } from '.';
interface FormProps {
    confirmCB?: (values: LooseObject) => void;
    input_configs: FormInputConfigArray;
    refCB?: (form: Form) => void;
}
interface FormState {
    values: LooseObject;
}
export default class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps);
    userConfirmedCB(): void;
    inputValueChangeCB(key: string, value: any): void;
    getValues(): LooseObject;
    render(): JSX.Element;
}
export {};
