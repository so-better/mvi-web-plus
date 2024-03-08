declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    optons: {
        type: ArrayConstructor;
        default: () => never[];
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
    fade: {
        type: BooleanConstructor;
        default: boolean;
    };
    indicators: {
        type: import("vue").PropType<boolean | import("./props").CarouselIndicatorsType>;
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
    controls: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    optons: {
        type: ArrayConstructor;
        default: () => never[];
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
    fade: {
        type: BooleanConstructor;
        default: boolean;
    };
    indicators: {
        type: import("vue").PropType<boolean | import("./props").CarouselIndicatorsType>;
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
    controls: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: number;
    fade: boolean;
    optons: unknown[];
    autoplay: boolean;
    loop: boolean;
    speed: number;
    interval: number;
    indicators: boolean | import("./props").CarouselIndicatorsType;
    vertical: boolean;
    touchable: boolean;
    controls: boolean;
}, {}>;
export default _default;
