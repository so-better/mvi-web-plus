export type * from './props';
declare const Picker: import('../../utils').SFCWithInstall<import("vue").DefineComponent<{
    options: {
        type: import("vue").PropType<import("./props").PickerOptionsItemType | import("./props").PickerOptionsItemType[]>;
        default: () => {
            values: never[];
            defaultIndex: number;
        };
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
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    cancel: (...args: any[]) => void;
    change: (...args: any[]) => void;
    confirm: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: import("vue").PropType<import("./props").PickerOptionsItemType | import("./props").PickerOptionsItemType[]>;
        default: () => {
            values: never[];
            defaultIndex: number;
        };
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
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
}, {
    title: string;
    loading: boolean;
    options: import("./props").PickerOptionsItemType | import("./props").PickerOptionsItemType[];
    cancelText: string;
    showToolbar: boolean;
    confirmText: string;
    visibleCounts: number;
    selectHeight: string;
}, {}>>;
export { Picker, Picker as default };
