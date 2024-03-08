import { ExtractPublicPropTypes, PropType } from 'vue';
export type CarouselIndicatorsType = {
    show?: false;
    active?: string;
    inactive?: string;
};
export type CarouselOptionsItemType = {};
export declare const CarouselProps: {
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
        type: PropType<boolean | CarouselIndicatorsType>;
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
};
export type CarouselPropsType = ExtractPublicPropTypes<typeof CarouselProps>;
