import { ComponentInternalInstance, ExtractPublicPropTypes, PropType } from 'vue';

export declare const LoadingBarProps: {
    color: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
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
export type LoadingBarPropsType = ExtractPublicPropTypes<typeof LoadingBarProps>;
