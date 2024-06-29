import { ExtractPublicPropTypes } from 'vue';
export declare const SliderProps: {
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
};
export type SliderPropsType = ExtractPublicPropTypes<typeof SliderProps>;
