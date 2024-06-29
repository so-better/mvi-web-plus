declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    type: {
        type: import("vue").PropType<"default" | "card">;
        default: string;
        validator(value: any): boolean;
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: import("vue").PropType<"fade" | "none" | "slide">;
        default: string;
        validator(value: any): boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    ellipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    flex: {
        type: import("vue").PropType<import("./props").TabsFlexType>;
        default: string;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
}, {
    setHeight: () => void;
    setSlider: () => void;
    to: (newValue: number, oldValue: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: import("vue").PropType<"default" | "card">;
        default: string;
        validator(value: any): boolean;
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: import("vue").PropType<"fade" | "none" | "slide">;
        default: string;
        validator(value: any): boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    ellipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    flex: {
        type: import("vue").PropType<import("./props").TabsFlexType>;
        default: string;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    border: boolean;
    type: "default" | "card";
    modelValue: number;
    timeout: number;
    offset: string;
    animation: "fade" | "none" | "slide";
    activeColor: string;
    ellipsis: boolean;
    flex: import("./props").TabsFlexType;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
