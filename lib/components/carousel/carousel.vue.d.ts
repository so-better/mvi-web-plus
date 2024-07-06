import { CarouselIndicatorsType } from './props';

declare function __VLS_template(): {
    default?(_: {}): any;
    indicators?(_: {
        total: number;
    }): any;
    controls?(_: {
        total: number;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
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
        type: import('vue').PropType<boolean | CarouselIndicatorsType>;
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
}, {
    setPrev: () => void;
    setNext: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
        type: import('vue').PropType<boolean | CarouselIndicatorsType>;
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
    indicators: boolean | CarouselIndicatorsType;
    controls: boolean;
    vertical: boolean;
    touchable: boolean;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
