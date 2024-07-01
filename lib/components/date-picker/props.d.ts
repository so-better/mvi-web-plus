import { ExtractPublicPropTypes, PropType } from 'vue';

export type DatePickerModeType = 'date' | 'datetime' | 'time' | 'month' | 'year';
export type DatePickerTimeType = 'year' | 'month' | 'date' | 'hour' | 'minute';
export declare const DatePickerProps: {
    modelValue: {
        type: DateConstructor;
        default: () => Date;
    };
    startDate: {
        type: DateConstructor;
        default: () => Date;
    };
    endDate: {
        type: DateConstructor;
        default: () => Date;
    };
    mode: {
        type: PropType<DatePickerModeType>;
        default: string;
        validator(value: any): boolean;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    visibleCounts: {
        type: NumberConstructor;
        default: number;
    };
    selectHeight: {
        type: StringConstructor;
        default: string;
    };
    formatter: {
        type: PropType<(type: DatePickerTimeType, val: number) => string>;
        default: null;
    };
};
export type DatePickerPropsType = ExtractPublicPropTypes<typeof DatePickerProps>;
