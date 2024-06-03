import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';

export type FieldAutosizeType = {
    maxRows?: number;
    minRows?: number;
};
export declare const FieldProps: {
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<"number" | "textarea" | "text" | "tel" | "password">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: PropType<"small" | "medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    maxlength: {
        type: NumberConstructor;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    prefix: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    suffix: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    prepend: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    append: {
        type: PropType<string | IconPropsType>;
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
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: PropType<"left" | "right" | "center">;
        default: string;
        validator(value: any): boolean;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputMode: {
        type: PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
        default: string;
        validator(value: any): boolean;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    autosize: {
        type: PropType<boolean | FieldAutosizeType>;
        default: boolean;
        validator(value: any): boolean;
    };
};
export type FieldPropsType = ExtractPublicPropTypes<typeof FieldProps>;
