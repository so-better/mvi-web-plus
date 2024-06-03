import { ExtractPublicPropTypes } from 'vue';

export declare const CircleProgressProps: {
    value: {
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
    size: {
        type: NumberConstructor;
        default: number;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    trackColor: {
        type: StringConstructor;
        default: null;
    };
    fill: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    showTip: {
        type: BooleanConstructor;
        default: boolean;
    };
    tipText: {
        type: StringConstructor;
        default: null;
    };
    strokeWidth: {
        type: NumberConstructor;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    clockWise: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type CircleProgressPropsType = ExtractPublicPropTypes<typeof CircleProgressProps>;
