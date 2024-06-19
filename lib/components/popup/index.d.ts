export type * from './props';
declare const Popup: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        overlayColor: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        placement: {
            type: import('vue').PropType<"left" | "top" | "bottom" | "right">;
            default: string;
            validator(value: any): boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        showTimes: {
            type: BooleanConstructor;
            default: boolean;
        };
        timesPlacement: {
            type: import('vue').PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
            default: string;
            validator(value: any): boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        __contentPadding: {
            type: BooleanConstructor;
            default: boolean;
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
        $$el: import('vue').ComputedRef<HTMLElement | null>;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        show: (...args: any[]) => void;
        showing: (...args: any[]) => void;
        shown: (...args: any[]) => void;
        hide: (...args: any[]) => void;
        hidding: (...args: any[]) => void;
        hidden: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        overlayColor: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        placement: {
            type: import('vue').PropType<"left" | "top" | "bottom" | "right">;
            default: string;
            validator(value: any): boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        showTimes: {
            type: BooleanConstructor;
            default: boolean;
        };
        timesPlacement: {
            type: import('vue').PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
            default: string;
            validator(value: any): boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        __contentPadding: {
            type: BooleanConstructor;
            default: boolean;
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
        width: string;
        mountEl: string;
        zIndex: number;
        modelValue: boolean;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        overlayColor: string;
        placement: "left" | "top" | "bottom" | "right";
        round: boolean;
        showTimes: boolean;
        timesPlacement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
        __contentPadding: boolean;
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
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        overlayColor: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        placement: {
            type: import('vue').PropType<"left" | "top" | "bottom" | "right">;
            default: string;
            validator(value: any): boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        showTimes: {
            type: BooleanConstructor;
            default: boolean;
        };
        timesPlacement: {
            type: import('vue').PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
            default: string;
            validator(value: any): boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        __contentPadding: {
            type: BooleanConstructor;
            default: boolean;
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
        $$el: import('vue').ComputedRef<HTMLElement | null>;
    }, {}, {}, {}, {
        width: string;
        mountEl: string;
        zIndex: number;
        modelValue: boolean;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        overlayColor: string;
        placement: "left" | "top" | "bottom" | "right";
        round: boolean;
        showTimes: boolean;
        timesPlacement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
        __contentPadding: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    placement: {
        type: import('vue').PropType<"left" | "top" | "bottom" | "right">;
        default: string;
        validator(value: any): boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    showTimes: {
        type: BooleanConstructor;
        default: boolean;
    };
    timesPlacement: {
        type: import('vue').PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
        default: string;
        validator(value: any): boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    __contentPadding: {
        type: BooleanConstructor;
        default: boolean;
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
    $$el: import('vue').ComputedRef<HTMLElement | null>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    show: (...args: any[]) => void;
    showing: (...args: any[]) => void;
    shown: (...args: any[]) => void;
    hide: (...args: any[]) => void;
    hidding: (...args: any[]) => void;
    hidden: (...args: any[]) => void;
}, string, {
    width: string;
    mountEl: string;
    zIndex: number;
    modelValue: boolean;
    timeout: number;
    closable: boolean;
    usePadding: boolean;
    overlayColor: string;
    placement: "left" | "top" | "bottom" | "right";
    round: boolean;
    showTimes: boolean;
    timesPlacement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    __contentPadding: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { Popup, Popup as default };
