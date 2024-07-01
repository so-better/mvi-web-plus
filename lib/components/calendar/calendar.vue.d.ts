declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: DateConstructor;
        default: () => Date;
    };
    view: {
        type: import('vue').PropType<import('./props').CalendarViewType>;
        default: string;
        validator(value: any): boolean;
    };
    monthText: {
        type: import('vue').PropType<string[]>;
        default: () => string[];
        validator(value: any): any;
    };
    weekText: {
        type: import('vue').PropType<string[]>;
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
        type: import('vue').PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    "date-click": (...args: any[]) => void;
    "month-click": (...args: any[]) => void;
    "year-click": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: DateConstructor;
        default: () => Date;
    };
    view: {
        type: import('vue').PropType<import('./props').CalendarViewType>;
        default: string;
        validator(value: any): boolean;
    };
    monthText: {
        type: import('vue').PropType<string[]>;
        default: () => string[];
        validator(value: any): any;
    };
    weekText: {
        type: import('vue').PropType<string[]>;
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
        type: import('vue').PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onDate-click"?: ((...args: any[]) => any) | undefined;
    "onMonth-click"?: ((...args: any[]) => any) | undefined;
    "onYear-click"?: ((...args: any[]) => any) | undefined;
}, {
    type: "info" | "success" | "warn" | "error" | "primary";
    modelValue: Date;
    view: import('./props').CalendarViewType;
    active: boolean;
    monthText: string[];
    weekText: string[];
    startDate: Date;
    endDate: Date;
    nonCurrentClick: boolean;
}, {}>;
export default _default;
