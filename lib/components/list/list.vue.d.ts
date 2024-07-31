declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    error: {
        type: BooleanConstructor;
        default: boolean;
    };
    finished: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    errorText: {
        type: StringConstructor;
        default: string;
    };
    finishedText: {
        type: StringConstructor;
        default: string;
    };
    immediateLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    scrollEl: {
        type: StringConstructor;
        default: null;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    load: (...args: any[]) => void;
    "update:loading": (...args: any[]) => void;
    "update:error": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    error: {
        type: BooleanConstructor;
        default: boolean;
    };
    finished: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    errorText: {
        type: StringConstructor;
        default: string;
    };
    finishedText: {
        type: StringConstructor;
        default: string;
    };
    immediateLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    scrollEl: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    onLoad?: ((...args: any[]) => any) | undefined;
    "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
    "onUpdate:error"?: ((...args: any[]) => any) | undefined;
}, {
    loading: boolean;
    error: boolean;
    content: string;
    finished: boolean;
    loadingText: string;
    errorText: string;
    finishedText: string;
    immediateLoad: boolean;
    scrollEl: string;
}, {}>, {
    default?(_: {}): any;
    finished?(_: {}): any;
    loading?(_: {}): any;
    error?(_: {}): any;
    content?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
