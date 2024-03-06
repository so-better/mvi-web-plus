import { ExtractPublicPropTypes, PropType } from 'vue';
import { LayerPropsType } from '../layer/props';
import { IconPropsType } from '../icon/props';
export declare const AutocompleteProps: {
    modelValue: {
        type: StringConstructor;
        default: string;
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
    list: {
        type: PropType<string[]>;
        default: () => never[];
    };
    activeType: {
        type: PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
        validator(value: any): any;
    };
    filterMethod: {
        type: PropType<boolean | ((value: string, list: string[]) => string[])>;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    layerProps: {
        type: PropType<LayerPropsType>;
        default: () => {};
    };
    height: {
        type: StringConstructor;
        default: null;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    leftIcon: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    rightIcon: {
        type: PropType<string | IconPropsType>;
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
    align: {
        type: PropType<"left" | "right" | "center">;
        default: string;
        validator(value: any): boolean;
    };
};
export type AutocompletePropsType = ExtractPublicPropTypes<typeof AutocompleteProps>;
