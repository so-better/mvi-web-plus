import { ExtractPublicPropTypes, PropType } from 'vue';
export type ColResponsiveType = {
    span?: number;
    offset?: number;
};
export declare const ColProps: {
    span: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    xs: {
        type: PropType<number | ColResponsiveType>;
        default: null;
    };
    sm: {
        type: PropType<number | ColResponsiveType>;
        default: null;
    };
    md: {
        type: PropType<number | ColResponsiveType>;
        default: null;
    };
    lg: {
        type: PropType<number | ColResponsiveType>;
        default: null;
    };
    xl: {
        type: PropType<number | ColResponsiveType>;
        default: null;
    };
};
export type ColPropsType = ExtractPublicPropTypes<typeof ColProps>;
