import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon';

export type InputAutosizeType = {
    maxRows?: number;
    minRows?: number;
};
export declare const InputProps: {
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    labelWidth: {
        type: StringConstructor;
        default: null;
    };
    labelAlign: {
        type: PropType<"left" | "center" | "right">;
        default: string;
        validator(value: any): boolean;
    };
    labelOffset: {
        type: StringConstructor;
        default: null;
    };
    type: {
        type: PropType<"text" | "password" | "number" | "tel" | "textarea">;
        default: string;
        validator(value: any): boolean;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    maxlength: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: PropType<"medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    required: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    showWordLimit: {
        type: BooleanConstructor;
        default: boolean;
    };
    left: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    right: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    autosize: {
        type: PropType<boolean | InputAutosizeType>;
        default: boolean;
        validator(value: any): boolean;
    };
    align: {
        type: PropType<"left" | "center" | "right">;
        default: string;
        validator(value: any): boolean;
    };
    inputMode: {
        type: PropType<"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url">;
        default: string;
        validator(value: any): boolean;
    };
};
export type InputPropsType = ExtractPublicPropTypes<typeof InputProps>;
