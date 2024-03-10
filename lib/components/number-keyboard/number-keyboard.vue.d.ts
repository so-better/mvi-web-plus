declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
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
}, {
    $$el: import("vue").ComputedRef<HTMLElement>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    show: (...args: any[]) => void;
    showing: (...args: any[]) => void;
    shown: (...args: any[]) => void;
    hide: (...args: any[]) => void;
    hidding: (...args: any[]) => void;
    hidden: (...args: any[]) => void;
    input: (...args: any[]) => void;
    delete: (...args: any[]) => void;
    complete: (...args: any[]) => void;
    "update:show": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
    mountEl: string;
    zIndex: number;
    modelValue: string | number;
    timeout: number;
    closable: boolean;
    usePadding: boolean;
    show: boolean;
    title: string;
    overlayColor: string;
    active: boolean;
    border: boolean;
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
}, {}>, {
    default?(_: {}): any;
    delete?(_: {}): any;
    complete?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
