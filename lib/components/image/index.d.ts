declare const Image: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        src: {
            type: StringConstructor;
            default: string;
        };
        fit: {
            type: import('vue').PropType<import('./props').ImageFillType>;
            default: string;
            validator(value: any): boolean;
        };
        alt: {
            type: StringConstructor;
            default: string;
        };
        showError: {
            type: BooleanConstructor;
            default: boolean;
        };
        showLoading: {
            type: BooleanConstructor;
            default: boolean;
        };
        lazyLoad: {
            type: BooleanConstructor;
            default: boolean;
        };
        root: {
            type: StringConstructor;
            default: null;
        };
        loadIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        errorIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        height: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        onError?: ((...args: any[]) => any) | undefined;
        onSuccess?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        success: (...args: any[]) => void;
        error: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        src: {
            type: StringConstructor;
            default: string;
        };
        fit: {
            type: import('vue').PropType<import('./props').ImageFillType>;
            default: string;
            validator(value: any): boolean;
        };
        alt: {
            type: StringConstructor;
            default: string;
        };
        showError: {
            type: BooleanConstructor;
            default: boolean;
        };
        showLoading: {
            type: BooleanConstructor;
            default: boolean;
        };
        lazyLoad: {
            type: BooleanConstructor;
            default: boolean;
        };
        root: {
            type: StringConstructor;
            default: null;
        };
        loadIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        errorIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        height: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        onError?: ((...args: any[]) => any) | undefined;
        onSuccess?: ((...args: any[]) => any) | undefined;
    }, {
        height: string;
        width: string;
        round: boolean;
        loadIcon: string | import('../icon').IconPropsType;
        root: string;
        src: string;
        fit: import('./props').ImageFillType;
        alt: string;
        showError: boolean;
        showLoading: boolean;
        lazyLoad: boolean;
        errorIcon: string | import('../icon').IconPropsType;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        src: {
            type: StringConstructor;
            default: string;
        };
        fit: {
            type: import('vue').PropType<import('./props').ImageFillType>;
            default: string;
            validator(value: any): boolean;
        };
        alt: {
            type: StringConstructor;
            default: string;
        };
        showError: {
            type: BooleanConstructor;
            default: boolean;
        };
        showLoading: {
            type: BooleanConstructor;
            default: boolean;
        };
        lazyLoad: {
            type: BooleanConstructor;
            default: boolean;
        };
        root: {
            type: StringConstructor;
            default: null;
        };
        loadIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        errorIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        height: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        onError?: ((...args: any[]) => any) | undefined;
        onSuccess?: ((...args: any[]) => any) | undefined;
    }, {}, {}, {}, {}, {
        height: string;
        width: string;
        round: boolean;
        loadIcon: string | import('../icon').IconPropsType;
        root: string;
        src: string;
        fit: import('./props').ImageFillType;
        alt: string;
        showError: boolean;
        showLoading: boolean;
        lazyLoad: boolean;
        errorIcon: string | import('../icon').IconPropsType;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    src: {
        type: StringConstructor;
        default: string;
    };
    fit: {
        type: import('vue').PropType<import('./props').ImageFillType>;
        default: string;
        validator(value: any): boolean;
    };
    alt: {
        type: StringConstructor;
        default: string;
    };
    showError: {
        type: BooleanConstructor;
        default: boolean;
    };
    showLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    lazyLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    root: {
        type: StringConstructor;
        default: null;
    };
    loadIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: string;
    };
    errorIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    height: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    onError?: ((...args: any[]) => any) | undefined;
    onSuccess?: ((...args: any[]) => any) | undefined;
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    success: (...args: any[]) => void;
    error: (...args: any[]) => void;
}, string, {
    height: string;
    width: string;
    round: boolean;
    loadIcon: string | import('../icon').IconPropsType;
    root: string;
    src: string;
    fit: import('./props').ImageFillType;
    alt: string;
    showError: boolean;
    showLoading: boolean;
    lazyLoad: boolean;
    errorIcon: string | import('../icon').IconPropsType;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        loading?(_: {}): any;
        error?(_: {}): any;
    };
})>;
export type * from './props';
export { Image, Image as default };
