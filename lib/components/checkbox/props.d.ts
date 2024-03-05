declare const _default: {
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: (BooleanConstructor | ArrayConstructor)[];
        default: boolean;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    value: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor | NumberConstructor)[];
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    placement: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
};
export default _default;
