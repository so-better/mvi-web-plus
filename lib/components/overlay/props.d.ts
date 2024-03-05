declare const _default: {
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    fade: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
        validator(value: any): boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export default _default;
