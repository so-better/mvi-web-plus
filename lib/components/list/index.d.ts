export type * from './props';
declare const List: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
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
    }, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        load: (...args: any[]) => void;
        "update:loading": (...args: any[]) => void;
        "update:error": (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
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
    }, {}, {}, {}, {}, {
        loading: boolean;
        error: boolean;
        content: string;
        finished: boolean;
        loadingText: string;
        errorText: string;
        finishedText: string;
        immediateLoad: boolean;
        scrollEl: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
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
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    load: (...args: any[]) => void;
    "update:loading": (...args: any[]) => void;
    "update:error": (...args: any[]) => void;
}, string, {
    loading: boolean;
    error: boolean;
    content: string;
    finished: boolean;
    loadingText: string;
    errorText: string;
    finishedText: string;
    immediateLoad: boolean;
    scrollEl: string;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
        finished?(_: {}): any;
        loading?(_: {}): any;
        error?(_: {}): any;
        content?(_: {}): any;
    };
})>;
export { List, List as default };
