declare const _default: {
    background: {
        type: StringConstructor;
        default: null;
    };
    borderColor: {
        type: StringConstructor;
        default: null;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
};
export default _default;
