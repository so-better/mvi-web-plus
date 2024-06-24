import { ExtractPublicPropTypes } from 'vue';

export declare const SwipeCellProps: {
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    centerClose: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type SwipeCellPropsType = ExtractPublicPropTypes<typeof SwipeCellProps>;
