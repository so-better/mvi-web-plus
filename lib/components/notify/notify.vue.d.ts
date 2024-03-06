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
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    __remove: {
        type: FunctionConstructor;
        default: () => () => void;
    };
    __init: {
        type: FunctionConstructor;
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
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    __remove: {
        type: FunctionConstructor;
        default: () => () => void;
    };
    __init: {
        type: FunctionConstructor;
        default: () => () => void;
    };
}>>, {
    zIndex: number;
    color: string;
    timeout: number;
    type: string;
    icon: string | Record<string, any>;
    background: string;
    __remove: Function;
    __init: Function;
    message: string;
}, {}>;
export default _default;
