import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const TooltipProps: {
    title: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined>;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    borderColor: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    textColor: {
        type: StringConstructor;
        default: null;
    };
    trigger: {
        type: PropType<"click" | "hover" | "custom">;
        default: string;
        validator(value: any): boolean;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    showTriangle: {
        type: BooleanConstructor;
        default: boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type TooltipPropsType = ExtractPublicPropTypes<typeof TooltipProps>;
