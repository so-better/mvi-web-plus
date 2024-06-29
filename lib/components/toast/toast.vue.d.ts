import { IconPropsType } from '../icon';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: import("vue").PropType<"loading" | "info" | "success" | "error">;
        default: null;
    };
    message: {
        type: StringConstructor;
        default: null;
    };
    timeout: {
        type: NumberConstructor;
        default: null;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    usePadding: {
        type: BooleanConstructor;
        default: null;
    };
    icon: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    shadow: {
        type: BooleanConstructor;
        default: null;
    };
    __remove: {
        type: import("vue").PropType<() => void>;
        default: () => () => void;
    };
    __init: {
        type: import("vue").PropType<(vm: import("vue").ComponentInternalInstance) => void>;
        default: () => () => void;
    };
}, {
    $$el: import("vue").ComputedRef<HTMLElement | null>;
    show: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: import("vue").PropType<"loading" | "info" | "success" | "error">;
        default: null;
    };
    message: {
        type: StringConstructor;
        default: null;
    };
    timeout: {
        type: NumberConstructor;
        default: null;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    usePadding: {
        type: BooleanConstructor;
        default: null;
    };
    icon: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    shadow: {
        type: BooleanConstructor;
        default: null;
    };
    __remove: {
        type: import("vue").PropType<() => void>;
        default: () => () => void;
    };
    __init: {
        type: import("vue").PropType<(vm: import("vue").ComponentInternalInstance) => void>;
        default: () => () => void;
    };
}>>, {
    type: "loading" | "info" | "success" | "error";
    mountEl: string;
    zIndex: number;
    color: string;
    timeout: number;
    usePadding: boolean;
    icon: string | IconPropsType;
    overlayColor: string;
    background: string;
    shadow: boolean;
    message: string;
    __remove: () => void;
    __init: (vm: import("vue").ComponentInternalInstance) => void;
}, {}>;
export default _default;
