import * as React from 'react';
import { PromptConfig, GeneratedForm } from '.';
export interface ModalProps {
    config: PromptConfig;
    cancelCB: () => void;
    form: GeneratedForm;
}
export default class Modal extends React.Component<ModalProps, any> {
    render(): JSX.Element;
}
