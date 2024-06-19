declare const ImagePreview: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        images: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        descriptions: {
            type: import('vue').PropType<string[]>;
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
            type: import('vue').PropType<"fade" | "slide" | undefined>;
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: {
                size: string;
                type: string;
            };
        };
        loadIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
        $$el: import('vue').ComputedRef<HTMLElement | null>;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        images: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        descriptions: {
            type: import('vue').PropType<string[]>;
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
            type: import('vue').PropType<"fade" | "slide" | undefined>;
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: {
                size: string;
                type: string;
            };
        };
        loadIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
        mode: "fade" | "slide" | undefined;
        mountEl: string;
        zIndex: number;
        modelValue: boolean;
        usePadding: boolean;
        active: number;
        loadIcon: string | import('../icon').IconPropsType;
        loop: boolean;
        controls: boolean;
        errorIcon: string | import('../icon').IconPropsType;
        maxScale: number;
        minScale: number;
        images: string[];
        descriptions: string[];
        showPage: boolean;
        useTools: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        images: {
            type: import('vue').PropType<string[]>;
            default: () => never[];
        };
        descriptions: {
            type: import('vue').PropType<string[]>;
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
            type: import('vue').PropType<"fade" | "slide" | undefined>;
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: {
                size: string;
                type: string;
            };
        };
        loadIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
        $$el: import('vue').ComputedRef<HTMLElement | null>;
    }, {}, {}, {}, {
        mode: "fade" | "slide" | undefined;
        mountEl: string;
        zIndex: number;
        modelValue: boolean;
        usePadding: boolean;
        active: number;
        loadIcon: string | import('../icon').IconPropsType;
        loop: boolean;
        controls: boolean;
        errorIcon: string | import('../icon').IconPropsType;
        maxScale: number;
        minScale: number;
        images: string[];
        descriptions: string[];
        showPage: boolean;
        useTools: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    images: {
        type: import('vue').PropType<string[]>;
        default: () => never[];
    };
    descriptions: {
        type: import('vue').PropType<string[]>;
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
        type: import('vue').PropType<"fade" | "slide" | undefined>;
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
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: {
            size: string;
            type: string;
        };
    };
    loadIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
    $$el: import('vue').ComputedRef<HTMLElement | null>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, {
    mode: "fade" | "slide" | undefined;
    mountEl: string;
    zIndex: number;
    modelValue: boolean;
    usePadding: boolean;
    active: number;
    loadIcon: string | import('../icon').IconPropsType;
    loop: boolean;
    controls: boolean;
    errorIcon: string | import('../icon').IconPropsType;
    maxScale: number;
    minScale: number;
    images: string[];
    descriptions: string[];
    showPage: boolean;
    useTools: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        page?(_: {
            total: number;
            current: number;
        }): any;
        tools?(_: {}): any;
        descriptions?(_: {
            total: number;
            current: number;
        }): any;
    };
})>;
export type * from './props';
export { ImagePreview, ImagePreview as default };
