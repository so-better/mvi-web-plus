import { ExtractPublicPropTypes } from 'vue';

export declare const ColorPickerProps: {
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    showAlpha: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type ColorPickerPropsType = ExtractPublicPropTypes<typeof ColorPickerProps>;
