export type * from './props';
declare const Modal: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
        ellipsis: {
            type: BooleanConstructor;
            default: boolean;
        };
        content: {
            type: StringConstructor;
            default: string;
        };
        footer: {
            type: StringConstructor;
            default: null;
        };
        showTimes: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
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
        width: {
            type: StringConstructor;
            default: null;
        };
        radius: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: StringConstructor;
            default: string;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        fullScreen: {
            type: BooleanConstructor;
            default: boolean;
        };
        __ignorePadding: {
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
        $$el: import("vue").ComputedRef<HTMLElement | null>;
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
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
        ellipsis: {
            type: BooleanConstructor;
            default: boolean;
        };
        content: {
            type: StringConstructor;
            default: string;
        };
        footer: {
            type: StringConstructor;
            default: null;
        };
        showTimes: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
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
        width: {
            type: StringConstructor;
            default: null;
        };
        radius: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: StringConstructor;
            default: string;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        fullScreen: {
            type: BooleanConstructor;
            default: boolean;
        };
        __ignorePadding: {
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
        footer: string;
        title: string;
        width: string;
        mountEl: string;
        zIndex: number;
        modelValue: boolean;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        overlayColor: string;
        showTimes: boolean;
        animation: string;
        center: boolean;
        content: string;
        ellipsis: boolean;
        radius: string;
        fullScreen: boolean;
        __ignorePadding: boolean;
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
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
        ellipsis: {
            type: BooleanConstructor;
            default: boolean;
        };
        content: {
            type: StringConstructor;
            default: string;
        };
        footer: {
            type: StringConstructor;
            default: null;
        };
        showTimes: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
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
        width: {
            type: StringConstructor;
            default: null;
        };
        radius: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: StringConstructor;
            default: string;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        fullScreen: {
            type: BooleanConstructor;
            default: boolean;
        };
        __ignorePadding: {
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
        $$el: import("vue").ComputedRef<HTMLElement | null>;
    }, {}, {}, {}, {
        footer: string;
        title: string;
        width: string;
        mountEl: string;
        zIndex: number;
        modelValue: boolean;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        overlayColor: string;
        showTimes: boolean;
        animation: string;
        center: boolean;
        content: string;
        ellipsis: boolean;
        radius: string;
        fullScreen: boolean;
        __ignorePadding: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
    ellipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    footer: {
        type: StringConstructor;
        default: null;
    };
    showTimes: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
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
    width: {
        type: StringConstructor;
        default: null;
    };
    radius: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: StringConstructor;
        default: string;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    fullScreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    __ignorePadding: {
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
    $$el: import("vue").ComputedRef<HTMLElement | null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    show: (...args: any[]) => void;
    showing: (...args: any[]) => void;
    shown: (...args: any[]) => void;
    hide: (...args: any[]) => void;
    hidding: (...args: any[]) => void;
    hidden: (...args: any[]) => void;
}, string, {
    footer: string;
    title: string;
    width: string;
    mountEl: string;
    zIndex: number;
    modelValue: boolean;
    timeout: number;
    closable: boolean;
    usePadding: boolean;
    overlayColor: string;
    showTimes: boolean;
    animation: string;
    center: boolean;
    content: string;
    ellipsis: boolean;
    radius: string;
    fullScreen: boolean;
    __ignorePadding: boolean;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        title?(_: {}): any;
        default?(_: {}): any;
        footer?(_: {}): any;
    };
})>;
export { Modal, Modal as default };
