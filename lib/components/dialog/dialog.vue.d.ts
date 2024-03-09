import { DialogInputType } from './props';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: import("vue").PropType<"confirm" | "alert" | "prompt">;
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
        type: import("vue").PropType<DialogInputType>;
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
}, {
    $$el: import("vue").ComputedRef<HTMLElement>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: import("vue").PropType<"confirm" | "alert" | "prompt">;
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
        type: import("vue").PropType<DialogInputType>;
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
}>>, {
    mountEl: string;
    zIndex: number;
    timeout: number;
    closable: boolean;
    usePadding: boolean;
    type: "confirm" | "alert" | "prompt";
    input: DialogInputType;
    title: string;
    overlayColor: string;
    width: string;
    animation: string;
    radius: string;
    message: string;
    btnText: string | unknown[];
    btnColor: string | unknown[];
    ios: boolean;
    __remove: Function;
}, {}>;
export default _default;
