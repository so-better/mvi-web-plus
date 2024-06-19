import { ExtractPublicPropTypes, PropType } from 'vue';
import { LayerPropsType } from '../layer';
import { CalendarViewType } from '../calendar';

export declare const DateChooserProps: {
    modelValue: {
        type: DateConstructor;
        default: () => Date;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    layerProps: {
        type: PropType<LayerPropsType>;
        default: () => {};
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: PropType<"click" | "hover" | "custom">;
        default: string;
        validator(value: any): boolean;
    };
    mode: {
        type: PropType<CalendarViewType>;
        default: string;
        validator(value: any): boolean;
    };
    monthText: {
        type: PropType<string[]>;
        default: () => string[];
    };
    weekText: {
        type: PropType<string[]>;
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
        type: PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    headerFormatter: {
        type: PropType<(type: CalendarViewType, val: number) => string>;
        default: null;
    };
};
export type DateChooserPropsType = ExtractPublicPropTypes<typeof DateChooserProps>;
