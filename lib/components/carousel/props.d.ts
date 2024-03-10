import { ExtractPublicPropTypes, PropType } from 'vue';
export type CarouselIndicatorsType = {
    show?: boolean;
    active?: string;
    inactive?: string;
};
export declare const CarouselProps: {
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
        type: PropType<"fade" | "slide">;
        default: string;
        validator(value: any): boolean;
    };
    indicators: {
        type: PropType<boolean | CarouselIndicatorsType>;
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
};
export type CarouselPropsType = ExtractPublicPropTypes<typeof CarouselProps>;
