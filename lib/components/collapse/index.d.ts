export type * from './props';
declare const Collapse: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
        onChange?: ((...args: any[]) => any) | undefined;
        "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
        "onSlide-down"?: ((...args: any[]) => any) | undefined;
        "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
        "onSlide-up"?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
        "before-slide-down": (...args: any[]) => void;
        "slide-down": (...args: any[]) => void;
        "before-slide-up": (...args: any[]) => void;
        "slide-up": (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
        onChange?: ((...args: any[]) => any) | undefined;
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
        onChange?: ((...args: any[]) => any) | undefined;
        "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
        "onSlide-down"?: ((...args: any[]) => any) | undefined;
        "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
        "onSlide-up"?: ((...args: any[]) => any) | undefined;
    }, {}, {}, {}, {}, {
        modelValue: number | unknown[];
        disabled: boolean;
        active: boolean;
        noWrap: boolean;
        accordion: boolean;
        inBorder: boolean;
        outBorder: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
    onChange?: ((...args: any[]) => any) | undefined;
    "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
    "onSlide-down"?: ((...args: any[]) => any) | undefined;
    "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
    "onSlide-up"?: ((...args: any[]) => any) | undefined;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
    "before-slide-down": (...args: any[]) => void;
    "slide-down": (...args: any[]) => void;
    "before-slide-up": (...args: any[]) => void;
    "slide-up": (...args: any[]) => void;
}, string, {
    modelValue: number | unknown[];
    disabled: boolean;
    active: boolean;
    noWrap: boolean;
    accordion: boolean;
    inBorder: boolean;
    outBorder: boolean;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { Collapse, Collapse as default };
