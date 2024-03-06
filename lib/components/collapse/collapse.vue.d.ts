import { DefineComponent } from 'vue';
declare const _default: __VLS_WithTemplateSlots<DefineComponent<{
    modelValue: {
        type: (NumberConstructor | ArrayConstructor)[];
        default: null;
    };
    accordion: {
        type: BooleanConstructor;
        default: boolean;
    };
    inBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    outBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    noWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    children: import("vue").Ref<DefineComponent[]>;
    props: {
        readonly modelValue: number | unknown[];
        readonly disabled: boolean;
        readonly active: boolean;
        readonly noWrap: boolean;
        readonly accordion: boolean;
        readonly inBorder: boolean;
        readonly outBorder: boolean;
    };
    emits: (event: "update:modelValue" | "before-slide-down" | "slide-down" | "before-slide-up" | "slide-up", ...args: any[]) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    "before-slide-down": (...args: any[]) => void;
    "slide-down": (...args: any[]) => void;
    "before-slide-up": (...args: any[]) => void;
    "slide-up": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (NumberConstructor | ArrayConstructor)[];
        default: null;
    };
    accordion: {
        type: BooleanConstructor;
        default: boolean;
    };
    inBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    outBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    noWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
    "onSlide-down"?: ((...args: any[]) => any) | undefined;
    "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
    "onSlide-up"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: number | unknown[];
    disabled: boolean;
    active: boolean;
    noWrap: boolean;
    accordion: boolean;
    inBorder: boolean;
    outBorder: boolean;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
