import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
import { LayerPropsType } from '../layer/props';

export type SelectOptionsItemType = {
    label?: string;
    value?: any;
    disabled?: boolean;
};
export type SelectOptionsItemPropsType = {
    label: string;
    value: string;
};
export declare const SelectProps: {
    modelValue: {
        type: PropType<any>;
        default: null;
    };
    options: {
        type: PropType<any[]>;
        default: never[];
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: PropType<"small" | "medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    layerProps: {
        type: PropType<LayerPropsType>;
        default: () => {};
    };
    height: {
        type: StringConstructor;
        default: null;
    };
    activeType: {
        type: PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
        validator(value: any): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    filterMethod: {
        type: PropType<(label: string[] | string) => string>;
        default: null;
    };
    showSelected: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectedIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: PropType<SelectOptionsItemPropsType>;
        default: () => {
            label: string;
            value: string;
        };
    };
    emptyText: {
        type: StringConstructor;
        default: string;
    };
};
export type SelectPropsType = ExtractPublicPropTypes<typeof SelectProps>;
