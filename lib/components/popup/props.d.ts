declare const _default: {
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    placement: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    showTimes: {
        type: BooleanConstructor;
        default: boolean;
    };
    timesPlacement: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    __contentPadding: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export default _default;
