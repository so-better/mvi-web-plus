import { ExtractPublicPropTypes, PropType } from 'vue';
export declare const MsgboxProps: {
    message: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    timeout: {
        type: NumberConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
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
    __remove: {
        type: PropType<() => void>;
        default: () => () => void;
    };
};
export type MsgboxPropsType = ExtractPublicPropTypes<typeof MsgboxProps>;
