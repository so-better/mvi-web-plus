import { ExtractPublicPropTypes } from 'vue';

export declare const FormElProps: {
    align: {
        type: StringConstructor;
        default: null;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: string;
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
export type FormElPropsType = ExtractPublicPropTypes<typeof FormElProps>;
