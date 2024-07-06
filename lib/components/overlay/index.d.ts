export type * from './props';
declare const Overlay: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        fade: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
            validator(value: any): boolean;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        usePadding: {
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
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        fade: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
            validator(value: any): boolean;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        usePadding: {
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
        mountEl: string;
        zIndex: number;
        color: string;
        modelValue: boolean;
        fade: boolean;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        fade: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
            validator(value: any): boolean;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        usePadding: {
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
        mountEl: string;
        zIndex: number;
        color: string;
        modelValue: boolean;
        fade: boolean;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    fade: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
        validator(value: any): boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
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
    mountEl: string;
    zIndex: number;
    color: string;
    modelValue: boolean;
    fade: boolean;
    timeout: number;
    closable: boolean;
    usePadding: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { Overlay, Overlay as default };
