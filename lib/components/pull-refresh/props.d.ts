import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
export type PullRefreshStatusType = 0 | 1 | 2;
export declare const PullRefreshProps: {
    pullingText: {
        type: StringConstructor;
        default: string;
    };
    loosingText: {
        type: StringConstructor;
        default: string;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    pullingIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    loosingIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    loadingIcon: {
        type: PropType<string | IconPropsType>;
        default: () => {
            type: string;
            spin: boolean;
        };
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    distance: {
        type: NumberConstructor;
        default: number;
    };
};
export type PullRefreshPropsType = ExtractPublicPropTypes<typeof PullRefreshProps>;
