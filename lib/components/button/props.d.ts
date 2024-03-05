declare const _default: {
    type: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: StringConstructor;
        default: string;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadText: {
        type: StringConstructor;
        default: string;
    };
    loadIcon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: () => {
            type: string;
            spin: boolean;
        };
    };
};
export default _default;
