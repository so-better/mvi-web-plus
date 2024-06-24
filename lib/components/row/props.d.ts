import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const RowProps: {
    justify: {
        type: PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
        default: string;
        validator(value: any): boolean;
    };
    align: {
        type: PropType<"center" | "flex-start" | "flex-end">;
        default: string;
        validator(value: any): boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
};
export type RowPropsType = ExtractPublicPropTypes<typeof RowProps>;
