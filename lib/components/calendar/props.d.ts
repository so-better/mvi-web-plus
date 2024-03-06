import { ExtractPublicPropTypes, PropType } from 'vue';
export type CalendarDayType = {
    date?: Date;
    nonCurrent?: boolean;
};
export type CalendarViewType = 'year' | 'month' | 'date';
export declare const CalendarProps: {
    modelValue: {
        type: DateConstructor;
        default: () => Date;
    };
    view: {
        type: PropType<CalendarViewType>;
        default: string;
        validator(value: any): boolean;
    };
    monthText: {
        type: ArrayConstructor;
        default: () => string[];
        validator(value: any): any;
    };
    weekText: {
        type: ArrayConstructor;
        default: () => string[];
        validator(value: any): any;
    };
    startDate: {
        type: DateConstructor;
        default: () => Date;
    };
    endDate: {
        type: DateConstructor;
        default: () => Date;
    };
    nonCurrentClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
};
export type CalendarPropsType = ExtractPublicPropTypes<typeof CalendarProps>;
