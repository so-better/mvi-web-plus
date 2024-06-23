export type * from './props';
declare const Layer: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        relate: {
            type: StringConstructor;
            default: null;
        };
        placement: {
            type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end">;
            default: string;
            validator(value: any): boolean;
        };
        offset: {
            type: StringConstructor;
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: null;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        showTriangle: {
            type: BooleanConstructor;
            default: boolean;
        };
        animation: {
            type: StringConstructor;
            default: null;
        };
        shadow: {
            type: BooleanConstructor;
            default: boolean;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        borderColor: {
            type: StringConstructor;
            default: null;
        };
        background: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onShowing?: ((...args: any[]) => any) | undefined;
        onShown?: ((...args: any[]) => any) | undefined;
        onHide?: ((...args: any[]) => any) | undefined;
        onHidding?: ((...args: any[]) => any) | undefined;
        onHidden?: ((...args: any[]) => any) | undefined;
    }, {
        $$el: import("vue").ComputedRef<HTMLElement | null>;
        update: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        show: (...args: any[]) => void;
        showing: (...args: any[]) => void;
        shown: (...args: any[]) => void;
        hide: (...args: any[]) => void;
        hidding: (...args: any[]) => void;
        hidden: (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        relate: {
            type: StringConstructor;
            default: null;
        };
        placement: {
            type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end">;
            default: string;
            validator(value: any): boolean;
        };
        offset: {
            type: StringConstructor;
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: null;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        showTriangle: {
            type: BooleanConstructor;
            default: boolean;
        };
        animation: {
            type: StringConstructor;
            default: null;
        };
        shadow: {
            type: BooleanConstructor;
            default: boolean;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        borderColor: {
            type: StringConstructor;
            default: null;
        };
        background: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onShowing?: ((...args: any[]) => any) | undefined;
        onShown?: ((...args: any[]) => any) | undefined;
        onHide?: ((...args: any[]) => any) | undefined;
        onHidding?: ((...args: any[]) => any) | undefined;
        onHidden?: ((...args: any[]) => any) | undefined;
    }, {
        border: boolean;
        width: string;
        zIndex: number;
        modelValue: boolean;
        timeout: number;
        closable: boolean;
        placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end";
        offset: string;
        background: string;
        borderColor: string;
        relate: string;
        showTriangle: boolean;
        animation: string;
        shadow: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        relate: {
            type: StringConstructor;
            default: null;
        };
        placement: {
            type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end">;
            default: string;
            validator(value: any): boolean;
        };
        offset: {
            type: StringConstructor;
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: null;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        showTriangle: {
            type: BooleanConstructor;
            default: boolean;
        };
        animation: {
            type: StringConstructor;
            default: null;
        };
        shadow: {
            type: BooleanConstructor;
            default: boolean;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        borderColor: {
            type: StringConstructor;
            default: null;
        };
        background: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onShowing?: ((...args: any[]) => any) | undefined;
        onShown?: ((...args: any[]) => any) | undefined;
        onHide?: ((...args: any[]) => any) | undefined;
        onHidding?: ((...args: any[]) => any) | undefined;
        onHidden?: ((...args: any[]) => any) | undefined;
    }, {
        $$el: import("vue").ComputedRef<HTMLElement | null>;
        update: () => void;
    }, {}, {}, {}, {
        border: boolean;
        width: string;
        zIndex: number;
        modelValue: boolean;
        timeout: number;
        closable: boolean;
        placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end";
        offset: string;
        background: string;
        borderColor: string;
        relate: string;
        showTriangle: boolean;
        animation: string;
        shadow: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    relate: {
        type: StringConstructor;
        default: null;
    };
    placement: {
        type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end">;
        default: string;
        validator(value: any): boolean;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTriangle: {
        type: BooleanConstructor;
        default: boolean;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    borderColor: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
    onShowing?: ((...args: any[]) => any) | undefined;
    onShown?: ((...args: any[]) => any) | undefined;
    onHide?: ((...args: any[]) => any) | undefined;
    onHidding?: ((...args: any[]) => any) | undefined;
    onHidden?: ((...args: any[]) => any) | undefined;
}, {
    $$el: import("vue").ComputedRef<HTMLElement | null>;
    update: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    show: (...args: any[]) => void;
    showing: (...args: any[]) => void;
    shown: (...args: any[]) => void;
    hide: (...args: any[]) => void;
    hidding: (...args: any[]) => void;
    hidden: (...args: any[]) => void;
}, string, {
    border: boolean;
    width: string;
    zIndex: number;
    modelValue: boolean;
    timeout: number;
    closable: boolean;
    placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end";
    offset: string;
    background: string;
    borderColor: string;
    relate: string;
    showTriangle: boolean;
    animation: string;
    shadow: boolean;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { Layer, Layer as default };
