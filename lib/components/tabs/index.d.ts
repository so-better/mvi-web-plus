export type * from './props';
declare const Tabs: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
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
        setHeight: () => void;
        setSlider: () => void;
        to: (newValue: number, oldValue: number) => void;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
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
        setHeight: () => void;
        setSlider: () => void;
        to: (newValue: number, oldValue: number) => void;
    }, {}, {}, {}, {
        modelValue: number;
        timeout: number;
        type: "default" | "card";
        offset: string;
        animation: "fade" | "none" | "slide";
        border: boolean;
        activeColor: string;
        ellipsis: boolean;
        flex: import('./props').TabsFlexType;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
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
    setHeight: () => void;
    setSlider: () => void;
    to: (newValue: number, oldValue: number) => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, {
    modelValue: number;
    timeout: number;
    type: "default" | "card";
    offset: string;
    animation: "fade" | "none" | "slide";
    border: boolean;
    activeColor: string;
    ellipsis: boolean;
    flex: import('./props').TabsFlexType;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { Tabs, Tabs as default };
