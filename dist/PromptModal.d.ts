import * as React from 'react';
export interface ConfirmModalProps {
    title: string;
    message: string;
    class: string;
    confirmCB: () => void;
    cancelCB: () => void;
    renderInputs: () => JSX.Element;
    show_cancel_btn: boolean;
}
export default class ConfirmModal extends React.Component<ConfirmModalProps, any> {
    container: typeof React.Component;
    constructor(props: any);
    renderCancelButton(): JSX.Element;
    render(): JSX.Element;
}
//# sourceMappingURL=PromptModal.d.ts.map