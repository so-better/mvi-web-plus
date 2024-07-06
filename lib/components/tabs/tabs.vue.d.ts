declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    type: {
        type: import('vue').PropType<"default" | "card">;
        default: string;
        validator(value: any): boolean;
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: import('vue').PropType<"none" | "slide" | "fade">;
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
        type: import('vue').PropType<import('./props').TabsFlexType>;
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
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    type: {
        type: import('vue').PropType<"default" | "card">;
        default: string;
        validator(value: any): boolean;
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: import('vue').PropType<"none" | "slide" | "fade">;
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
        type: import('vue').PropType<import('./props').TabsFlexType>;
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
    modelValue: number;
    timeout: number;
    type: "default" | "card";
    offset: string;
    animation: "fade" | "none" | "slide";
    border: boolean;
    activeColor: string;
    ellipsis: boolean;
    flex: import('./props').TabsFlexType;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
