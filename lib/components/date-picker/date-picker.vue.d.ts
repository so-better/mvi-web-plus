declare const _default: import('vue').DefineComponent<{
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
        type: import('vue').PropType<import('./props').DatePickerModeType>;
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
        type: import('vue').PropType<(type: import('./props').DatePickerTimeType, val: number) => string>;
        default: null;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    cancel: (...args: any[]) => void;
    change: (...args: any[]) => void;
    confirm: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
        type: import('vue').PropType<import('./props').DatePickerModeType>;
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
        type: import('vue').PropType<(type: import('./props').DatePickerTimeType, val: number) => string>;
        default: null;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    mode: import('./props').DatePickerModeType;
    modelValue: Date;
    loading: boolean;
    cancelText: string;
    startDate: Date;
    endDate: Date;
    showToolbar: boolean;
    confirmText: string;
    visibleCounts: number;
    selectHeight: string;
    formatter: (type: import('./props').DatePickerTimeType, val: number) => string;
}, {}>;
export default _default;
