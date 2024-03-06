import { ExtractPublicPropTypes } from 'vue';
export declare const TransitionSlideProps: {
    expand: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
};
export type TransitionSlidePropsType = ExtractPublicPropTypes<typeof TransitionSlideProps>;
