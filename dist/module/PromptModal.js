import * as React from 'react';
import styled, { keyframes } from 'styled-components';
//These are require because build engine doesn't like 'import ... .svg'.
let SymbolClone = require('../img/symbol_clone.svg');
let SymbolDelete = require('../img/symbol_delete.svg');
let SymbolArchive = require('../img/symbol_archive.svg');
let SymbolNewDoc = require('../img/symbol_new_doc.svg');
let SymbolNewFolder = require('../img/symbol_new_folder.svg');
const modal_animate_down = keyframes `
    from {
        transform: rotateX(1deg) translateY(-30px);
    }
    to {
        opacity: 1;
        transform: rotateX(0) translateY(0);
    }
`;
const ModalContainer = styled.div `
    @media (max-width: 700px) {
        .modal_container {
            .modal_box {
                width: 100% !important;
                top: 0 !important;
                bottom: 0 !important;
                border-radius: 0 !important;
            }
            .modal_footer {
                bottom: 0 !important;
                left: 0 !important;
                right: 0 !important;
                .modal_footer_cancel, .modal_footer_confirm {
                    width: 100% !important;
                    display: block !important;
                    margin-bottom: 14px !important;
                    button {
                        width: 100% !important;
                    }
                }
            }
        }
    }

    .modal_container {
        background-color: rgba(0,0,0,0.2);
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 20;
        perspective: 45px;
        .modal_box {
            transform-origin: center;
            animation: ${modal_animate_down} 0.4s both;
            border-radius: ${props => props.theme.components.modal.border_radius}px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            position: absolute;
            top: 100px;
            width: 500px;
            left: 0;
            right: 0;
            margin: auto;
            .modal_image {
                width: 500px;
                height: 300px;
                border-radius: 12px 12px 0 0;
            }
            .modal_head {
                background-color: ${props => props.theme.colors.background};
                border-radius: ${props => props.theme.components.modal.border_radius + 'px ' + props.theme.components.modal.border_radius + 'px 0 0'};
            }
            .modal_title {
                font-size: ${props => props.theme.sizes.fonts.big}px;
                padding: 20px 20px 20px;
                font-weight: bold;
            }
            .modal_subtitle {
                color: ${props => props.theme.colors.subtitle};
                font-size: ${props => props.theme.sizes.fonts.small}px;
                margin-top: -8px;
                padding: 0 20px 20px;
            }
            .modal_body {
                text-align: center;
                margin: 24px 20px 20px;
                .live_edit_section{
                    margin-top: 20px;
                }
            }
            .modal_footer {
                padding: 20px;
                .modal_footer_cancel, .modal_footer_confirm{
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
export default class Modal extends React.Component {
    render() {
        return (React.createElement(ModalContainer, null,
            React.createElement("div", { className: `modal_container` },
                React.createElement("div", { className: "modal_box" },
                    React.createElement("div", { className: "modal_head" },
                        React.createElement("div", { className: "modal_title" }, this.props.config.title),
                        this.props.config.message ? React.createElement("div", { className: "modal_subtitle" }, this.props.config.message) : null),
                    React.createElement("div", { className: "modal_body" },
                        React.createElement(this.props.form.component, null))))));
    }
}

//# sourceMappingURL=PromptModal.js.map
