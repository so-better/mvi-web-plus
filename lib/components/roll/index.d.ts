declare const Roll: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        interval: {
            type: NumberConstructor;
            default: number;
        };
        direction: {
            type: import('vue').PropType<"left" | "right" | "up" | "down">;
            default: string;
            validator(value: any): boolean;
        };
        autoplay: {
            type: BooleanConstructor;
            default: boolean;
        };
        loop: {
            type: BooleanConstructor;
            default: boolean;
        };
        animation: {
            type: import('vue').PropType<"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out">;
            default: string;
            validator(value: any): boolean;
        };
        clickStop: {
            type: BooleanConstructor;
            default: boolean;
        };
        hoverStop: {
            type: BooleanConstructor;
            default: boolean;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onPause?: ((...args: any[]) => any) | undefined;
        onPlay?: ((...args: any[]) => any) | undefined;
        onStop?: ((...args: any[]) => any) | undefined;
    }, {
        pause: () => void;
        stop: () => void;
        play: () => void;
        isStopped: import('vue').ComputedRef<boolean>;
        isPaused: import('vue').ComputedRef<boolean>;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        stop: (...args: any[]) => void;
        pause: (...args: any[]) => void;
        play: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        interval: {
            type: NumberConstructor;
            default: number;
        };
        direction: {
            type: import('vue').PropType<"left" | "right" | "up" | "down">;
            default: string;
            validator(value: any): boolean;
        };
        autoplay: {
            type: BooleanConstructor;
            default: boolean;
        };
        loop: {
            type: BooleanConstructor;
            default: boolean;
        };
        animation: {
            type: import('vue').PropType<"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out">;
            default: string;
            validator(value: any): boolean;
        };
        clickStop: {
            type: BooleanConstructor;
            default: boolean;
        };
        hoverStop: {
            type: BooleanConstructor;
            default: boolean;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onPause?: ((...args: any[]) => any) | undefined;
        onPlay?: ((...args: any[]) => any) | undefined;
        onStop?: ((...args: any[]) => any) | undefined;
    }, {
        animation: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
        center: boolean;
        autoplay: boolean;
        loop: boolean;
        interval: number;
        direction: "left" | "right" | "up" | "down";
        clickStop: boolean;
        hoverStop: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        interval: {
            type: NumberConstructor;
            default: number;
        };
        direction: {
            type: import('vue').PropType<"left" | "right" | "up" | "down">;
            default: string;
            validator(value: any): boolean;
        };
        autoplay: {
            type: BooleanConstructor;
            default: boolean;
        };
        loop: {
            type: BooleanConstructor;
            default: boolean;
        };
        animation: {
            type: import('vue').PropType<"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out">;
            default: string;
            validator(value: any): boolean;
        };
        clickStop: {
            type: BooleanConstructor;
            default: boolean;
        };
        hoverStop: {
            type: BooleanConstructor;
            default: boolean;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onPause?: ((...args: any[]) => any) | undefined;
        onPlay?: ((...args: any[]) => any) | undefined;
        onStop?: ((...args: any[]) => any) | undefined;
    }, {
        pause: () => void;
        stop: () => void;
        play: () => void;
        isStopped: import('vue').ComputedRef<boolean>;
        isPaused: import('vue').ComputedRef<boolean>;
    }, {}, {}, {}, {
        animation: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
        center: boolean;
        autoplay: boolean;
        loop: boolean;
        interval: number;
        direction: "left" | "right" | "up" | "down";
        clickStop: boolean;
        hoverStop: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    interval: {
        type: NumberConstructor;
        default: number;
    };
    direction: {
        type: import('vue').PropType<"left" | "right" | "up" | "down">;
        default: string;
        validator(value: any): boolean;
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    animation: {
        type: import('vue').PropType<"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out">;
        default: string;
        validator(value: any): boolean;
    };
    clickStop: {
        type: BooleanConstructor;
        default: boolean;
    };
    hoverStop: {
        type: BooleanConstructor;
        default: boolean;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onPause?: ((...args: any[]) => any) | undefined;
    onPlay?: ((...args: any[]) => any) | undefined;
    onStop?: ((...args: any[]) => any) | undefined;
}, {
    pause: () => void;
    stop: () => void;
    play: () => void;
    isStopped: import('vue').ComputedRef<boolean>;
    isPaused: import('vue').ComputedRef<boolean>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    stop: (...args: any[]) => void;
    pause: (...args: any[]) => void;
    play: (...args: any[]) => void;
}, string, {
    animation: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
    center: boolean;
    autoplay: boolean;
    loop: boolean;
    interval: number;
    direction: "left" | "right" | "up" | "down";
    clickStop: boolean;
    hoverStop: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export type * from './props';
export { Roll, Roll as default };
