import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const LayerProps: {
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    relate: {
        type: StringConstructor;
        default: null;
    };
    placement: {
        type: PropType<"top" | "left" | "right" | "bottom" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end">;
        default: string;
        validator(value: any): boolean;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: null;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTriangle: {
        type: BooleanConstructor;
        default: boolean;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    shadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    borderColor: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
};
export type LayerPropsType = ExtractPublicPropTypes<typeof LayerProps>;
