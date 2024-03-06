import { ExtractPublicPropTypes, PropType } from 'vue';
export declare const LoadingProps: {
    type: {
        type: PropType<"default" | "circle" | "spin" | "dots" | "transfer">;
        default: string;
        validator(value: any): boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
};
export type LoadingPropsType = ExtractPublicPropTypes<typeof LoadingProps>;
