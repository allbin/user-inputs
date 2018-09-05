import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import oh from 'output-helpers';
import Button from './Button';
import SymbolClone from './img/symbol_clone.svg';
import SymbolDelete from './img/symbol_delete.svg';
import SymbolArchive from './img/symbol_archive.svg';
import SymbolNewDoc from './img/symbol_new_doc.svg';
import SymbolNewFolder from './img/symbol_new_folder.svg';

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

    constructor(props) {
        super(props);

        const modal_animate_down = keyframes`
            from {
                transform: rotateX(1deg) translateY(-30px);
            }
            to {
                opacity: 1;
                transform: rotateX(0) translateY(0);
            }
        `;

        this.container = styled.div `
            .modal_container{
                background-color: rgba(0,0,0,0.2);
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 20;
                perspective: 45px;
                .modal_box{
                    transform-origin: center;
                    animation: ${modal_animate_down} 0.4s both;
                    border-radius: 12px;
                    background-color: #fff;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    position: absolute;
                    top: 100px;
                    width: 500px;
                    left: 0;
                    right: 0;
                    margin: auto;
                    .modal_footer, .modal_title{
                        text-align: center;
                        left: 0;
                        right: 0;
                    }
                    .modal_image{
                        width: 500px;
                        height: 300px;
                        border-radius: 12px 12px 0 0;
                    }
                    .modal_title{
                        margin: 20px 0 20px;
                        font-weight: bold;
                        text-align: center;
                        font-size: 24px;
                    }
                    .modal_body{
                        opacity: 0.6;
                        text-align: center;
                        margin: 12px 20px 28px;
                        .user_input{
                            margin-top: 12px;
                        }
                        .live_edit_section{
                            margin-top: 20px;
                        }
                    }
                    .modal_footer{
                        padding: 20px;
                        .modal_footer_left, .modal_footer_right{
                            display: inline-block;
                            width: 50%;
                            white-space: nowrap;
                            vertical-align: top;
                            overflow: hidden;
                        }
                    }
                }
            }
            .symbol{
                margin: auto;
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
                &.symbol_clone{
                    background-image: url(${SymbolClone});
                }
                &.symbol_archive{
                    background-image: url(${SymbolArchive});
                }
                &.symbol_delete{
                    background-image: url(${SymbolDelete});
                }
                &.symbol_new_doc{
                    background-image: url(${SymbolNewDoc});
                }
                &.symbol_new_folder{
                    background-image: url(${SymbolNewFolder});
                }

            }
        `;
    }


    render() {
        return (
            <this.container>
                <div className={`modal_container`}>
                    <div className="modal_box">
                        {
                            this.props.class ?
                            <div className={`modal_image symbol symbol_${this.props.class}`}> </div>
                            :
                            null
                        }
                        <div className="modal_title">
                            { this.props.title }
                        </div>
                        <div className="modal_body">
                            { this.props.message }
                            { this.props.renderInputs() }
                        </div>
                        <div className="modal_footer">
                            {
                                this.props.remove_cancel === true ?
                                null
                                :
                                <div className="modal_footer_left">
                                    <Button
                                        big
                                        filled
                                        label={oh.translate('user_input_hoc_cancel')}
                                        onClick={() => this.props.cancelCB()}
                                    />
                                </div>
                            }

                            <div className="modal_footer_left">
                                <Button
                                    big
                                    filled
                                    label={oh.translate('user_input_hoc_confirm')}
                                    light
                                    onClick={() => this.props.confirmCB()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </this.container>
        );
    }
}
