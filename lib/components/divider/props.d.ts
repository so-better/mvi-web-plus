import { ExtractPublicPropTypes } from 'vue';
export declare const DividerProps: {
    dashed: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
};
export type DividerPropsType = ExtractPublicPropTypes<typeof DividerProps>;
