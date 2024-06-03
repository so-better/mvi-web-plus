import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const RollProps: {
    interval: {
        type: NumberConstructor;
        default: number;
    };
    direction: {
        type: PropType<"left" | "right" | "up" | "down">;
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
        type: PropType<"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out">;
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
};
export type RollPropsType = ExtractPublicPropTypes<typeof RollProps>;
