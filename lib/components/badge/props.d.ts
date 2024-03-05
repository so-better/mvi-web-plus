declare const _default: {
    content: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    placement: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    offset: {
        type: ArrayConstructor;
        default: () => null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export default _default;
