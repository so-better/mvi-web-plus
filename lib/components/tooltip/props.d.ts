declare const _default: {
    title: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    borderColor: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    trigger: {
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
        default: number;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    showTriangle: {
        type: BooleanConstructor;
        default: boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export default _default;
