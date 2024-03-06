import { ExtractPublicPropTypes } from 'vue';
export declare const SignProps: {
    color: {
        type: StringConstructor;
        default: string;
    };
    background: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
};
export type SignPropsType = ExtractPublicPropTypes<typeof SignProps>;
