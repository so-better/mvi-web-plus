import { ComponentInternalInstance, ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon';

export declare const NotifyProps: {
    type: {
        type: PropType<"success" | "info" | "primary" | "error" | "warn">;
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
        type: PropType<string | IconPropsType>;
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
export type NotifyPropsType = ExtractPublicPropTypes<typeof NotifyProps>;
