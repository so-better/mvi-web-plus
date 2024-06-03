import { DialogInputType, DialogPcBtnsType } from './props';

declare const _default: import('vue').DefineComponent<{
    type: {
        type: import('vue').PropType<"Confirm" | "Alert" | "Prompt">;
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
        type: import('vue').PropType<DialogInputType>;
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
        type: import('vue').PropType<DialogPcBtnsType>;
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
}, {
    $$el: import('vue').ComputedRef<HTMLElement | null>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    type: {
        type: import('vue').PropType<"Confirm" | "Alert" | "Prompt">;
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
        type: import('vue').PropType<DialogInputType>;
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
        type: import('vue').PropType<DialogPcBtnsType>;
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
}>>, {
    mountEl: string;
    zIndex: number;
    timeout: number;
    closable: boolean;
    usePadding: boolean;
    type: "Confirm" | "Alert" | "Prompt";
    input: DialogInputType;
    title: string;
    overlayColor: string;
    width: string;
    showTimes: boolean;
    animation: string;
    center: boolean;
    radius: string;
    message: string;
    __remove: Function;
    btns: DialogPcBtnsType;
}, {}>;
export default _default;
