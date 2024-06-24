export type * from './props';
declare const NumberKeyboard: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        showDecimal: {
            type: BooleanConstructor;
            default: boolean;
        };
        showDelete: {
            type: BooleanConstructor;
            default: boolean;
        };
        showComplete: {
            type: BooleanConstructor;
            default: boolean;
        };
        show: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        maxlength: {
            type: NumberConstructor;
            default: number;
        };
        deleteText: {
            type: StringConstructor;
            default: string;
        };
        completeText: {
            type: StringConstructor;
            default: string;
        };
        promiseEmpty: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        overlayColor: {
            type: StringConstructor;
            default: string;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        calibration: {
            type: BooleanConstructor;
            default: boolean;
        };
        showX: {
            type: BooleanConstructor;
            default: boolean;
        };
        random: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        border: {
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
        onInput?: ((...args: any[]) => any) | undefined;
        "onUpdate:show"?: ((...args: any[]) => any) | undefined;
        onDelete?: ((...args: any[]) => any) | undefined;
        onComplete?: ((...args: any[]) => any) | undefined;
    }, {
        $$el: import('vue').ComputedRef<HTMLElement | null>;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        delete: (...args: any[]) => void;
        input: (...args: any[]) => void;
        "update:modelValue": (...args: any[]) => void;
        show: (...args: any[]) => void;
        showing: (...args: any[]) => void;
        shown: (...args: any[]) => void;
        hide: (...args: any[]) => void;
        hidding: (...args: any[]) => void;
        hidden: (...args: any[]) => void;
        complete: (...args: any[]) => void;
        "update:show": (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        showDecimal: {
            type: BooleanConstructor;
            default: boolean;
        };
        showDelete: {
            type: BooleanConstructor;
            default: boolean;
        };
        showComplete: {
            type: BooleanConstructor;
            default: boolean;
        };
        show: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        maxlength: {
            type: NumberConstructor;
            default: number;
        };
        deleteText: {
            type: StringConstructor;
            default: string;
        };
        completeText: {
            type: StringConstructor;
            default: string;
        };
        promiseEmpty: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        overlayColor: {
            type: StringConstructor;
            default: string;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        calibration: {
            type: BooleanConstructor;
            default: boolean;
        };
        showX: {
            type: BooleanConstructor;
            default: boolean;
        };
        random: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        border: {
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
        onInput?: ((...args: any[]) => any) | undefined;
        "onUpdate:show"?: ((...args: any[]) => any) | undefined;
        onDelete?: ((...args: any[]) => any) | undefined;
        onComplete?: ((...args: any[]) => any) | undefined;
    }, {
        title: string;
        border: boolean;
        mountEl: string;
        zIndex: number;
        modelValue: string | number;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        show: boolean;
        overlayColor: string;
        active: boolean;
        maxlength: number;
        showDecimal: boolean;
        showDelete: boolean;
        showComplete: boolean;
        deleteText: string;
        completeText: string;
        promiseEmpty: boolean;
        calibration: boolean;
        showX: boolean;
        random: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        showDecimal: {
            type: BooleanConstructor;
            default: boolean;
        };
        showDelete: {
            type: BooleanConstructor;
            default: boolean;
        };
        showComplete: {
            type: BooleanConstructor;
            default: boolean;
        };
        show: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        maxlength: {
            type: NumberConstructor;
            default: number;
        };
        deleteText: {
            type: StringConstructor;
            default: string;
        };
        completeText: {
            type: StringConstructor;
            default: string;
        };
        promiseEmpty: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        overlayColor: {
            type: StringConstructor;
            default: string;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        calibration: {
            type: BooleanConstructor;
            default: boolean;
        };
        showX: {
            type: BooleanConstructor;
            default: boolean;
        };
        random: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        border: {
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
        onInput?: ((...args: any[]) => any) | undefined;
        "onUpdate:show"?: ((...args: any[]) => any) | undefined;
        onDelete?: ((...args: any[]) => any) | undefined;
        onComplete?: ((...args: any[]) => any) | undefined;
    }, {
        $$el: import('vue').ComputedRef<HTMLElement | null>;
    }, {}, {}, {}, {
        title: string;
        border: boolean;
        mountEl: string;
        zIndex: number;
        modelValue: string | number;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        show: boolean;
        overlayColor: string;
        active: boolean;
        maxlength: number;
        showDecimal: boolean;
        showDelete: boolean;
        showComplete: boolean;
        deleteText: string;
        completeText: string;
        promiseEmpty: boolean;
        calibration: boolean;
        showX: boolean;
        random: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    showDecimal: {
        type: BooleanConstructor;
        default: boolean;
    };
    showDelete: {
        type: BooleanConstructor;
        default: boolean;
    };
    showComplete: {
        type: BooleanConstructor;
        default: boolean;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxlength: {
        type: NumberConstructor;
        default: number;
    };
    deleteText: {
        type: StringConstructor;
        default: string;
    };
    completeText: {
        type: StringConstructor;
        default: string;
    };
    promiseEmpty: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    overlayColor: {
        type: StringConstructor;
        default: string;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    calibration: {
        type: BooleanConstructor;
        default: boolean;
    };
    showX: {
        type: BooleanConstructor;
        default: boolean;
    };
    random: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    border: {
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
    onInput?: ((...args: any[]) => any) | undefined;
    "onUpdate:show"?: ((...args: any[]) => any) | undefined;
    onDelete?: ((...args: any[]) => any) | undefined;
    onComplete?: ((...args: any[]) => any) | undefined;
}, {
    $$el: import('vue').ComputedRef<HTMLElement | null>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    delete: (...args: any[]) => void;
    input: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    show: (...args: any[]) => void;
    showing: (...args: any[]) => void;
    shown: (...args: any[]) => void;
    hide: (...args: any[]) => void;
    hidding: (...args: any[]) => void;
    hidden: (...args: any[]) => void;
    complete: (...args: any[]) => void;
    "update:show": (...args: any[]) => void;
}, string, {
    title: string;
    border: boolean;
    mountEl: string;
    zIndex: number;
    modelValue: string | number;
    timeout: number;
    closable: boolean;
    usePadding: boolean;
    show: boolean;
    overlayColor: string;
    active: boolean;
    maxlength: number;
    showDecimal: boolean;
    showDelete: boolean;
    showComplete: boolean;
    deleteText: string;
    completeText: string;
    promiseEmpty: boolean;
    calibration: boolean;
    showX: boolean;
    random: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
        delete?(_: {}): any;
        complete?(_: {}): any;
    };
})>;
export { NumberKeyboard, NumberKeyboard as default };
