import * as React from 'react';
import { GeneratedForm } from './formGenerator';
import { PromptConfig } from '.';
export interface ModalProps {
    config: PromptConfig;
    cancelCB: () => void;
    form: GeneratedForm;
}
export default class Modal extends React.Component<ModalProps, any> {
    render(): JSX.Element;
}
