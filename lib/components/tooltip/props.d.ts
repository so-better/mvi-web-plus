import { ExtractPublicPropTypes, PropType } from 'vue';
import { LayerPropsType } from '../layer';

export declare const TooltipProps: {
    title: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: PropType<LayerPropsType["placement"]>;
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
        type: PropType<"hover" | "click" | "custom">;
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
