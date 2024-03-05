declare const _default: {
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    relate: {
        type: StringConstructor;
        default: null;
    };
    placement: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTriangle: {
        type: BooleanConstructor;
        default: boolean;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    borderColor: {
        type: StringConstructor;
        default: string;
    };
    background: {
        type: StringConstructor;
        default: string;
    };
};
export default _default;
