import { IconPropsType } from '../icon';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: null;
    };
    message: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    timeout: {
        type: NumberConstructor;
        default: null;
    };
    icon: {
        type: import("vue").PropType<string | IconPropsType>;
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
    show: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: null;
    };
    message: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    timeout: {
        type: NumberConstructor;
        default: null;
    };
    icon: {
        type: import("vue").PropType<string | IconPropsType>;
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
    type: "info" | "success" | "warn" | "error" | "primary";
    zIndex: number;
    color: string;
    timeout: number;
    icon: string | IconPropsType;
    background: string;
    message: string;
    __remove: () => void;
    __init: (vm: import("vue").ComponentInternalInstance) => void;
}, {}>;
export default _default;
