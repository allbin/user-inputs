import * as React from 'react';
export interface ConfirmModalProps {
    title: string;
    message: string;
    remove_cancel: boolean;
    class: string;
    confirmCB: () => void;
    cancelCB: () => void;
    renderInputs: () => JSX.Element;
}
export default class ConfirmModal extends React.Component<ConfirmModalProps, any> {
    container: typeof React.Component;
    constructor(props: any);
    render(): JSX.Element;
}
//# sourceMappingURL=PromptModal.d.ts.map