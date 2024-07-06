export type * from './props';
declare const Carousel: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        autoplay: {
            type: BooleanConstructor;
            default: boolean;
        };
        loop: {
            type: BooleanConstructor;
            default: boolean;
        };
        speed: {
            type: NumberConstructor;
            default: number;
        };
        interval: {
            type: NumberConstructor;
            default: number;
        };
        mode: {
            type: import('vue').PropType<"slide" | "fade">;
            default: string;
            validator(value: any): boolean;
        };
        indicators: {
            type: import('vue').PropType<boolean | import('./props').CarouselIndicatorsType>;
            default: boolean;
        };
        controls: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        touchable: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        setPrev: () => void;
        setNext: () => void;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        autoplay: {
            type: BooleanConstructor;
            default: boolean;
        };
        loop: {
            type: BooleanConstructor;
            default: boolean;
        };
        speed: {
            type: NumberConstructor;
            default: number;
        };
        interval: {
            type: NumberConstructor;
            default: number;
        };
        mode: {
            type: import('vue').PropType<"slide" | "fade">;
            default: string;
            validator(value: any): boolean;
        };
        indicators: {
            type: import('vue').PropType<boolean | import('./props').CarouselIndicatorsType>;
            default: boolean;
        };
        controls: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        touchable: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        mode: "fade" | "slide";
        modelValue: number;
        autoplay: boolean;
        loop: boolean;
        speed: number;
        interval: number;
        indicators: boolean | import('./props').CarouselIndicatorsType;
        controls: boolean;
        vertical: boolean;
        touchable: boolean;
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
        autoplay: {
            type: BooleanConstructor;
            default: boolean;
        };
        loop: {
            type: BooleanConstructor;
            default: boolean;
        };
        speed: {
            type: NumberConstructor;
            default: number;
        };
        interval: {
            type: NumberConstructor;
            default: number;
        };
        mode: {
            type: import('vue').PropType<"slide" | "fade">;
            default: string;
            validator(value: any): boolean;
        };
        indicators: {
            type: import('vue').PropType<boolean | import('./props').CarouselIndicatorsType>;
            default: boolean;
        };
        controls: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        touchable: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        setPrev: () => void;
        setNext: () => void;
    }, {}, {}, {}, {
        mode: "fade" | "slide";
        modelValue: number;
        autoplay: boolean;
        loop: boolean;
        speed: number;
        interval: number;
        indicators: boolean | import('./props').CarouselIndicatorsType;
        controls: boolean;
        vertical: boolean;
        touchable: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    interval: {
        type: NumberConstructor;
        default: number;
    };
    mode: {
        type: import('vue').PropType<"slide" | "fade">;
        default: string;
        validator(value: any): boolean;
    };
    indicators: {
        type: import('vue').PropType<boolean | import('./props').CarouselIndicatorsType>;
        default: boolean;
    };
    controls: {
        type: BooleanConstructor;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    touchable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    setPrev: () => void;
    setNext: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, {
    mode: "fade" | "slide";
    modelValue: number;
    autoplay: boolean;
    loop: boolean;
    speed: number;
    interval: number;
    indicators: boolean | import('./props').CarouselIndicatorsType;
    controls: boolean;
    vertical: boolean;
    touchable: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
        indicators?(_: {
            total: number;
        }): any;
        controls?(_: {
            total: number;
        }): any;
    };
})>;
export { Carousel, Carousel as default };
