declare const _default: import('vue').DefineComponent<{
    color: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    __remove: {
        type: import('vue').PropType<() => void>;
        default: () => () => void;
    };
    __init: {
        type: import('vue').PropType<(vm: import('vue').ComponentInternalInstance) => void>;
        default: () => () => void;
    };
}, {
    leave: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    __remove: {
        type: import('vue').PropType<() => void>;
        default: () => () => void;
    };
    __init: {
        type: import('vue').PropType<(vm: import('vue').ComponentInternalInstance) => void>;
        default: () => () => void;
    };
}>>, {
    zIndex: number;
    color: string;
    __remove: () => void;
    __init: (vm: import('vue').ComponentInternalInstance) => void;
}, {}>;
export default _default;
