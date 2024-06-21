import { ComponentInternalInstance, ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
export declare const ToastProps: {
    type: {
        type: PropType<"loading" | "info" | "success" | "error">;
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
        type: PropType<string | IconPropsType>;
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
        type: PropType<() => void>;
        default: () => () => void;
    };
    __init: {
        type: PropType<(vm: ComponentInternalInstance) => void>;
        default: () => () => void;
    };
};
export type ToastPropsType = ExtractPublicPropTypes<typeof ToastProps>;
