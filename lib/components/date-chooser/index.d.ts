declare const DateChooser: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: DateConstructor;
            default: () => Date;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        layerProps: {
            type: import('vue').PropType<import('../layer').LayerPropsType>;
            default: () => {};
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        trigger: {
            type: import('vue').PropType<"click" | "hover" | "custom">;
            default: string;
            validator(value: any): boolean;
        };
        mode: {
            type: import('vue').PropType<import('../calendar').CalendarViewType>;
            default: string;
            validator(value: any): boolean;
        };
        monthText: {
            type: import('vue').PropType<string[]>;
            default: () => string[];
        };
        weekText: {
            type: import('vue').PropType<string[]>;
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
            type: import('vue').PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
        headerFormatter: {
            type: import('vue').PropType<(type: import('../calendar').CalendarViewType, val: number) => string>;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        openCalendar: () => void;
        closeCalendar: () => void;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: DateConstructor;
            default: () => Date;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        layerProps: {
            type: import('vue').PropType<import('../layer').LayerPropsType>;
            default: () => {};
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        trigger: {
            type: import('vue').PropType<"click" | "hover" | "custom">;
            default: string;
            validator(value: any): boolean;
        };
        mode: {
            type: import('vue').PropType<import('../calendar').CalendarViewType>;
            default: string;
            validator(value: any): boolean;
        };
        monthText: {
            type: import('vue').PropType<string[]>;
            default: () => string[];
        };
        weekText: {
            type: import('vue').PropType<string[]>;
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
            type: import('vue').PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
        headerFormatter: {
            type: import('vue').PropType<(type: import('../calendar').CalendarViewType, val: number) => string>;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        type: "info" | "success" | "warn" | "error" | "primary";
        mode: import('../calendar').CalendarViewType;
        modelValue: Date;
        closable: boolean;
        disabled: boolean;
        active: boolean;
        layerProps: {
            border?: boolean | undefined;
            width?: string | undefined;
            zIndex?: number | undefined;
            modelValue?: boolean | undefined;
            timeout?: number | undefined;
            closable?: boolean | undefined;
            placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
            offset?: string | undefined;
            background?: string | undefined;
            borderColor?: string | undefined;
            relate?: string | undefined;
            showTriangle?: boolean | undefined;
            animation?: string | undefined;
            shadow?: boolean | undefined;
        };
        block: boolean;
        monthText: string[];
        weekText: string[];
        startDate: Date;
        endDate: Date;
        trigger: "click" | "hover" | "custom";
        headerFormatter: (type: import('../calendar').CalendarViewType, val: number) => string;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: DateConstructor;
            default: () => Date;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        layerProps: {
            type: import('vue').PropType<import('../layer').LayerPropsType>;
            default: () => {};
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        trigger: {
            type: import('vue').PropType<"click" | "hover" | "custom">;
            default: string;
            validator(value: any): boolean;
        };
        mode: {
            type: import('vue').PropType<import('../calendar').CalendarViewType>;
            default: string;
            validator(value: any): boolean;
        };
        monthText: {
            type: import('vue').PropType<string[]>;
            default: () => string[];
        };
        weekText: {
            type: import('vue').PropType<string[]>;
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
            type: import('vue').PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
        headerFormatter: {
            type: import('vue').PropType<(type: import('../calendar').CalendarViewType, val: number) => string>;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        openCalendar: () => void;
        closeCalendar: () => void;
    }, {}, {}, {}, {
        type: "info" | "success" | "warn" | "error" | "primary";
        mode: import('../calendar').CalendarViewType;
        modelValue: Date;
        closable: boolean;
        disabled: boolean;
        active: boolean;
        layerProps: {
            border?: boolean | undefined;
            width?: string | undefined;
            zIndex?: number | undefined;
            modelValue?: boolean | undefined;
            timeout?: number | undefined;
            closable?: boolean | undefined;
            placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
            offset?: string | undefined;
            background?: string | undefined;
            borderColor?: string | undefined;
            relate?: string | undefined;
            showTriangle?: boolean | undefined;
            animation?: string | undefined;
            shadow?: boolean | undefined;
        };
        block: boolean;
        monthText: string[];
        weekText: string[];
        startDate: Date;
        endDate: Date;
        trigger: "click" | "hover" | "custom";
        headerFormatter: (type: import('../calendar').CalendarViewType, val: number) => string;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: DateConstructor;
        default: () => Date;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    layerProps: {
        type: import('vue').PropType<import('../layer').LayerPropsType>;
        default: () => {};
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: import('vue').PropType<"click" | "hover" | "custom">;
        default: string;
        validator(value: any): boolean;
    };
    mode: {
        type: import('vue').PropType<import('../calendar').CalendarViewType>;
        default: string;
        validator(value: any): boolean;
    };
    monthText: {
        type: import('vue').PropType<string[]>;
        default: () => string[];
    };
    weekText: {
        type: import('vue').PropType<string[]>;
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
        type: import('vue').PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    headerFormatter: {
        type: import('vue').PropType<(type: import('../calendar').CalendarViewType, val: number) => string>;
        default: null;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    openCalendar: () => void;
    closeCalendar: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, {
    type: "info" | "success" | "warn" | "error" | "primary";
    mode: import('../calendar').CalendarViewType;
    modelValue: Date;
    closable: boolean;
    disabled: boolean;
    active: boolean;
    layerProps: {
        border?: boolean | undefined;
        width?: string | undefined;
        zIndex?: number | undefined;
        modelValue?: boolean | undefined;
        timeout?: number | undefined;
        closable?: boolean | undefined;
        placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
        offset?: string | undefined;
        background?: string | undefined;
        borderColor?: string | undefined;
        relate?: string | undefined;
        showTriangle?: boolean | undefined;
        animation?: string | undefined;
        shadow?: boolean | undefined;
    };
    block: boolean;
    monthText: string[];
    weekText: string[];
    startDate: Date;
    endDate: Date;
    trigger: "click" | "hover" | "custom";
    headerFormatter: (type: import('../calendar').CalendarViewType, val: number) => string;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export type * from './props';
export { DateChooser, DateChooser as default };
