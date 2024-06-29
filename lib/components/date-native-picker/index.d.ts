export type * from './props';
declare const DateNativePicker: import('../../utils').SFCWithInstall<import("vue").DefineComponent<{
    type: {
        type: import("vue").PropType<"time" | "date" | "month" | "datetime">;
        default: string;
        validator(value: any): boolean;
    };
    modelValue: {
        type: DateConstructor;
        default: null;
    };
    max: {
        type: DateConstructor;
        default: null;
    };
    min: {
        type: DateConstructor;
        default: null;
    };
}, {
    trigger: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    error: (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: import("vue").PropType<"time" | "date" | "month" | "datetime">;
        default: string;
        validator(value: any): boolean;
    };
    modelValue: {
        type: DateConstructor;
        default: null;
    };
    max: {
        type: DateConstructor;
        default: null;
    };
    min: {
        type: DateConstructor;
        default: null;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
}, {
    type: "time" | "date" | "month" | "datetime";
    modelValue: Date;
    min: Date;
    max: Date;
}, {}>>;
export { DateNativePicker, DateNativePicker as default };
