import { ExtractPublicPropTypes } from 'vue';
export declare const NumberKeyboardProps: {
    showDecimal: {
        type: BooleanConstructor;
        default: boolean;
    };
    showDelete: {
        type: BooleanConstructor;
        default: boolean;
    };
    showComplete: {
        type: BooleanConstructor;
        default: boolean;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxlength: {
        type: NumberConstructor;
        default: number;
    };
    deleteText: {
        type: StringConstructor;
        default: string;
    };
    completeText: {
        type: StringConstructor;
        default: string;
    };
    promiseEmpty: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    overlayColor: {
        type: StringConstructor;
        default: string;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    calibration: {
        type: BooleanConstructor;
        default: boolean;
    };
    showX: {
        type: BooleanConstructor;
        default: boolean;
    };
    random: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type NumberKeyboardPropsType = ExtractPublicPropTypes<typeof NumberKeyboardProps>;
