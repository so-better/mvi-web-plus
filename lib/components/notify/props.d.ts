declare const _default: {
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
};
export default _default;
