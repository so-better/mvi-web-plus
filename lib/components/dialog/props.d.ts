import { ExtractPublicPropTypes, PropType } from 'vue';
import { ButtonPropsType } from '../button';
export type DialogInputType = {
    placeholder?: string;
    type?: string;
    value?: string;
    autofocus?: boolean;
    maxlength?: number;
    clearable?: boolean;
    align?: 'left' | 'center' | 'right';
    mode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
};
export type DialogPcBtnsType = {
    ok?: ButtonPropsType;
    cancel?: ButtonPropsType;
};
export declare const DialogProps: {
    type: {
        type: PropType<"confirm" | "alert" | "prompt">;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    message: {
        default: string;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    radius: {
        type: StringConstructor;
        default: null;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    closable: {
        type: BooleanConstructor;
        default: null;
    };
    input: {
        type: PropType<DialogInputType>;
        default: null;
    };
    usePadding: {
        type: BooleanConstructor;
        default: null;
    };
    btnText: {
        type: (StringConstructor | ArrayConstructor)[];
        default: null;
    };
    btnColor: {
        type: (StringConstructor | ArrayConstructor)[];
        default: null;
    };
    ios: {
        type: BooleanConstructor;
        default: null;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    timeout: {
        type: NumberConstructor;
        default: null;
    };
    __remove: {
        type: FunctionConstructor;
        default: () => () => void;
    };
};
export declare const DialogPcProps: {
    type: {
        type: PropType<"Confirm" | "Alert" | "Prompt">;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    message: {
        default: string;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    radius: {
        type: StringConstructor;
        default: null;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    closable: {
        type: BooleanConstructor;
        default: null;
    };
    input: {
        type: PropType<DialogInputType>;
        default: null;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: null;
    };
    btns: {
        type: PropType<DialogPcBtnsType>;
        default: null;
    };
    showTimes: {
        type: BooleanConstructor;
        default: null;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    timeout: {
        type: NumberConstructor;
        default: null;
    };
    __remove: {
        type: FunctionConstructor;
        default: () => () => void;
    };
};
export type DialogPropsType = ExtractPublicPropTypes<typeof DialogProps>;
export type DialogPcPropsType = ExtractPublicPropTypes<typeof DialogPcProps>;
