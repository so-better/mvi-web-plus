import { ExtractPublicPropTypes } from 'vue';

export declare const FormProps: {
    width: {
        type: StringConstructor;
        default: null;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    labelBlock: {
        type: BooleanConstructor;
        default: boolean;
    };
    labelWidth: {
        type: StringConstructor;
        default: null;
    };
    labelOffset: {
        type: StringConstructor;
        default: null;
    };
};
export type FormPropsType = ExtractPublicPropTypes<typeof FormProps>;
