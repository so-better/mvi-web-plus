import { ExtractPublicPropTypes, PropType } from 'vue';

export type PickerOptionsItemType = {
    values: string[];
    defaultIndex: number;
};
export type PickerActiveType = {
    value: string;
    index: number;
};
export type PickerCrisisType = {
    max: number;
    min: number;
};
export declare const PickerProps: {
    options: {
        type: PropType<PickerOptionsItemType | PickerOptionsItemType[]>;
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
};
export type PickerPropsType = ExtractPublicPropTypes<typeof PickerProps>;
