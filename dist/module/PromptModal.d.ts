import * as React from 'react';
import Form from './Form';
import { PromptInputConfigArray } from '.';
export interface ModalProps {
    title: string;
    message: string;
    class: string;
    confirmCB: () => void;
    cancelCB: () => void;
    input_configs: PromptInputConfigArray;
    show_cancel_btn: boolean;
    show_confirm_btn: boolean;
    confirm_button_label?: string;
    cancel_button_label?: string;
}
export default class Modal extends React.Component<ModalProps, any> {
    form: Form | null;
    renderCancelButton(): JSX.Element | null;
    renderConfirmButton(): JSX.Element | null;
    render(): JSX.Element;
}
