import { ExtractPublicPropTypes } from 'vue';

export declare const SignProps: {
    color: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
};
export type SignPropsType = ExtractPublicPropTypes<typeof SignProps>;
