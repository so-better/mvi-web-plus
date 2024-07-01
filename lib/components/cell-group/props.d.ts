import { ExtractPublicPropTypes } from 'vue';

export declare const CellGroupProps: {
    title: {
        type: StringConstructor;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type CellGroupPropsType = ExtractPublicPropTypes<typeof CellGroupProps>;
