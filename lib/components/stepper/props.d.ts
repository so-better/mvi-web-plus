import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const StepperProps: {
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: PropType<"small" | "medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    min: {
        type: NumberConstructor;
        default: null;
    };
    max: {
        type: NumberConstructor;
        default: null;
    };
    digit: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledPlus: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledMinus: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledInput: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPlus: {
        type: BooleanConstructor;
        default: boolean;
    };
    showMinus: {
        type: BooleanConstructor;
        default: boolean;
    };
    showInput: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputWidth: {
        type: StringConstructor;
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputAlign: {
        type: PropType<"left" | "right" | "center">;
        default: string;
        validator(value: any): boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type StepperPropsType = ExtractPublicPropTypes<typeof StepperProps>;
