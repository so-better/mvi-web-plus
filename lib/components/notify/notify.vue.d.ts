import { IconPropsType } from '../icon/props';
declare const _default: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
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
        type: StringConstructor;
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
    zIndex: number;
    color: string;
    timeout: number;
    type: string;
    icon: string | IconPropsType;
    background: string;
    message: string;
    __remove: () => void;
    __init: (vm: import("vue").ComponentInternalInstance) => void;
}, {}>;
export default _default;
