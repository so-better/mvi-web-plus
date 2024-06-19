declare const Slider: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        min: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
            default: number;
        };
        strokeWidth: {
            type: StringConstructor;
            default: string;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        trackColor: {
            type: StringConstructor;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        min: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
            default: number;
        };
        strokeWidth: {
            type: StringConstructor;
            default: string;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        trackColor: {
            type: StringConstructor;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        color: string;
        modelValue: number;
        disabled: boolean;
        round: boolean;
        square: boolean;
        vertical: boolean;
        min: number;
        max: number;
        trackColor: string;
        strokeWidth: string;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        min: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
            default: number;
        };
        strokeWidth: {
            type: StringConstructor;
            default: string;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        trackColor: {
            type: StringConstructor;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {}, {}, {}, {}, {
        color: string;
        modelValue: number;
        disabled: boolean;
        round: boolean;
        square: boolean;
        vertical: boolean;
        min: number;
        max: number;
        trackColor: string;
        strokeWidth: string;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    strokeWidth: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    trackColor: {
        type: StringConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, {
    color: string;
    modelValue: number;
    disabled: boolean;
    round: boolean;
    square: boolean;
    vertical: boolean;
    min: number;
    max: number;
    trackColor: string;
    strokeWidth: string;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        button?(_: {}): any;
    };
})>;
export type * from './props';
export { Slider, Slider as default };
