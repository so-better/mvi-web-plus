export type * from './props';
declare const TransitionSlide: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        expand: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
        "onSlide-down"?: ((...args: any[]) => any) | undefined;
        "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
        "onSlide-up"?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "before-slide-down": (...args: any[]) => void;
        "slide-down": (...args: any[]) => void;
        "before-slide-up": (...args: any[]) => void;
        "slide-up": (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        expand: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
        "onSlide-down"?: ((...args: any[]) => any) | undefined;
        "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
        "onSlide-up"?: ((...args: any[]) => any) | undefined;
    }, {
        timeout: number;
        expand: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        expand: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
        "onSlide-down"?: ((...args: any[]) => any) | undefined;
        "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
        "onSlide-up"?: ((...args: any[]) => any) | undefined;
    }, {}, {}, {}, {}, {
        timeout: number;
        expand: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    expand: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
    "onSlide-down"?: ((...args: any[]) => any) | undefined;
    "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
    "onSlide-up"?: ((...args: any[]) => any) | undefined;
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "before-slide-down": (...args: any[]) => void;
    "slide-down": (...args: any[]) => void;
    "before-slide-up": (...args: any[]) => void;
    "slide-up": (...args: any[]) => void;
}, string, {
    timeout: number;
    expand: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { TransitionSlide, TransitionSlide as default };
