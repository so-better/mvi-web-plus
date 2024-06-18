declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    images: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    descriptions: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    active: {
        type: NumberConstructor;
        default: number;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    mode: {
        type: import("vue").PropType<"fade" | "slide" | undefined>;
        default: string;
    };
    controls: {
        type: BooleanConstructor;
        default: boolean;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPage: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    useTools: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorIcon: {
        type: import("vue").PropType<string | import('../../index').IconPropsType>;
        default: {
            size: string;
            type: string;
        };
    };
    loadIcon: {
        type: import("vue").PropType<string | import('../../index').IconPropsType>;
        default: () => {
            size: string;
            type: string;
        };
    };
    maxScale: {
        type: NumberConstructor;
        default: number;
    };
    minScale: {
        type: NumberConstructor;
        default: number;
    };
}, {
    $$el: import("vue").ComputedRef<HTMLElement | null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    images: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    descriptions: {
        type: import("vue").PropType<string[]>;
        default: () => never[];
    };
    active: {
        type: NumberConstructor;
        default: number;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    mode: {
        type: import("vue").PropType<"fade" | "slide" | undefined>;
        default: string;
    };
    controls: {
        type: BooleanConstructor;
        default: boolean;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPage: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    useTools: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorIcon: {
        type: import("vue").PropType<string | import('../../index').IconPropsType>;
        default: {
            size: string;
            type: string;
        };
    };
    loadIcon: {
        type: import("vue").PropType<string | import('../../index').IconPropsType>;
        default: () => {
            size: string;
            type: string;
        };
    };
    maxScale: {
        type: NumberConstructor;
        default: number;
    };
    minScale: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    mountEl: string;
    zIndex: number;
    modelValue: boolean;
    usePadding: boolean;
    active: number;
    loadIcon: string | import('../../index').IconPropsType;
    mode: "fade" | "slide" | undefined;
    loop: boolean;
    controls: boolean;
    errorIcon: string | import('../../index').IconPropsType;
    maxScale: number;
    minScale: number;
    images: string[];
    descriptions: string[];
    showPage: boolean;
    useTools: boolean;
}, {}>, {
    page?(_: {
        total: number;
        current: number;
    }): any;
    tools?(_: {}): any;
    descriptions?(_: {
        total: number;
        current: number;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
