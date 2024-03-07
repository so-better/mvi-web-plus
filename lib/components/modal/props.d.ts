import { ExtractPublicPropTypes } from 'vue';
export declare const ModalProps: {
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
    ellipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    footer: {
        type: StringConstructor;
        default: null;
    };
    showTimes: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    radius: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: StringConstructor;
        default: string;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    fullScreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    __ignorePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type ModalPropsType = ExtractPublicPropTypes<typeof ModalProps>;
