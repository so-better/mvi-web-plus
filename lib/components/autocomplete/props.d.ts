declare const _default: {
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    list: {
        type: ArrayConstructor;
        default: () => never[];
    };
    activeType: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
        validator(value: any): any;
    };
    filterMethod: {
        type: (BooleanConstructor | FunctionConstructor)[];
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    layerProps: {
        type: ObjectConstructor;
        default: () => {};
    };
    height: {
        type: StringConstructor;
        default: null;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    leftIcon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    rightIcon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
};
export default _default;
