import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const TriangleProps: {
    background: {
        type: StringConstructor;
        default: null;
    };
    borderColor: {
        type: StringConstructor;
        default: null;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: PropType<"top" | "left" | "right" | "bottom">;
        default: string;
        validator(value: any): boolean;
    };
};
export type TrianglePropsType = ExtractPublicPropTypes<typeof TriangleProps>;
