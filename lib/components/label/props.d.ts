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
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    mark: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export default _default;
