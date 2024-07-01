export type * from './props';
declare const PullRefresh: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        pullingText: {
            type: StringConstructor;
            default: string;
        };
        loosingText: {
            type: StringConstructor;
            default: string;
        };
        loadingText: {
            type: StringConstructor;
            default: string;
        };
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        pullingIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        loosingIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        loadingIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: () => {
                type: string;
                spin: boolean;
            };
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        distance: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRefresh?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        refresh: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        pullingText: {
            type: StringConstructor;
            default: string;
        };
        loosingText: {
            type: StringConstructor;
            default: string;
        };
        loadingText: {
            type: StringConstructor;
            default: string;
        };
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        pullingIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        loosingIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        loadingIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: () => {
                type: string;
                spin: boolean;
            };
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        distance: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRefresh?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: boolean;
        disabled: boolean;
        loadingText: string;
        pullingText: string;
        loosingText: string;
        pullingIcon: string | import('../icon').IconPropsType;
        loosingIcon: string | import('../icon').IconPropsType;
        loadingIcon: string | import('../icon').IconPropsType;
        distance: number;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        pullingText: {
            type: StringConstructor;
            default: string;
        };
        loosingText: {
            type: StringConstructor;
            default: string;
        };
        loadingText: {
            type: StringConstructor;
            default: string;
        };
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        pullingIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        loosingIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: string;
        };
        loadingIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: () => {
                type: string;
                spin: boolean;
            };
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        distance: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRefresh?: ((...args: any[]) => any) | undefined;
    }, {}, {}, {}, {}, {
        modelValue: boolean;
        disabled: boolean;
        loadingText: string;
        pullingText: string;
        loosingText: string;
        pullingIcon: string | import('../icon').IconPropsType;
        loosingIcon: string | import('../icon').IconPropsType;
        loadingIcon: string | import('../icon').IconPropsType;
        distance: number;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    pullingText: {
        type: StringConstructor;
        default: string;
    };
    loosingText: {
        type: StringConstructor;
        default: string;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    pullingIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: string;
    };
    loosingIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: string;
    };
    loadingIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: () => {
            type: string;
            spin: boolean;
        };
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    distance: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onRefresh?: ((...args: any[]) => any) | undefined;
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    refresh: (...args: any[]) => void;
}, string, {
    modelValue: boolean;
    disabled: boolean;
    loadingText: string;
    pullingText: string;
    loosingText: string;
    pullingIcon: string | import('../icon').IconPropsType;
    loosingIcon: string | import('../icon').IconPropsType;
    loadingIcon: string | import('../icon').IconPropsType;
    distance: number;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        el?(_: {
            status: import('./props').PullRefreshStatusType;
        }): any;
        default?(_: {}): any;
    };
})>;
export { PullRefresh, PullRefresh as default };
