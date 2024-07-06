import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const DateNativePickerProps: {
    type: {
        type: PropType<"date" | "datetime" | "month" | "time">;
        default: string;
        validator(value: any): boolean;
    };
    modelValue: {
        type: DateConstructor;
        default: null;
    };
    max: {
        type: DateConstructor;
        default: null;
    };
    min: {
        type: DateConstructor;
        default: null;
    };
};
export type DateNativePickerPropsType = ExtractPublicPropTypes<typeof DateNativePickerProps>;
