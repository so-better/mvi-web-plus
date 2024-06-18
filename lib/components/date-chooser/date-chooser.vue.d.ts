import { LayerPropsType } from '../layer/props';
import { CalendarViewType } from '../calendar/props';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    modelValue: {
        type: DateConstructor;
        default: () => Date;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    layerProps: {
        type: import("vue").PropType<LayerPropsType>;
        default: () => {};
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: import("vue").PropType<"click" | "hover" | "custom">;
        default: string;
        validator(value: any): boolean;
    };
    mode: {
        type: import("vue").PropType<CalendarViewType>;
        default: string;
        validator(value: any): boolean;
    };
    monthText: {
        type: import("vue").PropType<string[]>;
        default: () => string[];
    };
    weekText: {
        type: import("vue").PropType<string[]>;
        default: () => string[];
    };
    startDate: {
        type: DateConstructor;
        default: () => Date;
    };
    endDate: {
        type: DateConstructor;
        default: () => Date;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    headerFormatter: {
        type: import("vue").PropType<(type: CalendarViewType, val: number) => string>;
        default: null;
    };
}, {
    openCalendar: () => void;
    closeCalendar: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: DateConstructor;
        default: () => Date;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    layerProps: {
        type: import("vue").PropType<LayerPropsType>;
        default: () => {};
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: import("vue").PropType<"click" | "hover" | "custom">;
        default: string;
        validator(value: any): boolean;
    };
    mode: {
        type: import("vue").PropType<CalendarViewType>;
        default: string;
        validator(value: any): boolean;
    };
    monthText: {
        type: import("vue").PropType<string[]>;
        default: () => string[];
    };
    weekText: {
        type: import("vue").PropType<string[]>;
        default: () => string[];
    };
    startDate: {
        type: DateConstructor;
        default: () => Date;
    };
    endDate: {
        type: DateConstructor;
        default: () => Date;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    headerFormatter: {
        type: import("vue").PropType<(type: CalendarViewType, val: number) => string>;
        default: null;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: Date;
    closable: boolean;
    type: "info" | "success" | "warn" | "error" | "primary";
    disabled: boolean;
    active: boolean;
    layerProps: {
        zIndex?: number | undefined;
        modelValue?: boolean | undefined;
        timeout?: number | undefined;
        closable?: boolean | undefined;
        placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
        width?: string | undefined;
        offset?: string | undefined;
        background?: string | undefined;
        borderColor?: string | undefined;
        relate?: string | undefined;
        showTriangle?: boolean | undefined;
        animation?: string | undefined;
        shadow?: boolean | undefined;
        border?: boolean | undefined;
    };
    block: boolean;
    mode: CalendarViewType;
    monthText: string[];
    weekText: string[];
    startDate: Date;
    endDate: Date;
    trigger: "click" | "hover" | "custom";
    headerFormatter: (type: CalendarViewType, val: number) => string;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
