declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: import('vue').PropType<"small" | "medium" | "large">;
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
        type: import('vue').PropType<"left" | "right" | "center">;
        default: string;
        validator(value: any): boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: import('vue').PropType<"small" | "medium" | "large">;
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
        type: import('vue').PropType<"left" | "right" | "center">;
        default: string;
        validator(value: any): boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    size: "small" | "medium" | "large";
    border: boolean;
    modelValue: number;
    disabled: boolean;
    active: boolean;
    min: number;
    max: number;
    step: number;
    digit: number;
    disabledPlus: boolean;
    disabledMinus: boolean;
    disabledInput: boolean;
    showPlus: boolean;
    showMinus: boolean;
    showInput: boolean;
    inputWidth: string;
    inputAlign: "left" | "right" | "center";
}, {}>;
export default _default;
