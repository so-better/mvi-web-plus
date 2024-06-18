import { FieldAutosizeType } from './props';
import { IconPropsType } from '../icon/props';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
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
        type: import("vue").PropType<"number" | "textarea" | "text" | "tel" | "password">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: import("vue").PropType<"small" | "medium" | "large">;
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
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    suffix: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    prepend: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    append: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    activeType: {
        type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
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
        type: import("vue").PropType<"left" | "right" | "center">;
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
        type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
        default: string;
        validator(value: any): boolean;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    autosize: {
        type: import("vue").PropType<boolean | FieldAutosizeType>;
        default: boolean;
        validator(value: any): boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    input: (...args: any[]) => void;
    clear: (...args: any[]) => void;
    focus: (...args: any[]) => void;
    blur: (...args: any[]) => void;
    keydown: (...args: any[]) => void;
    keyup: (...args: any[]) => void;
    "prepend-click": (...args: any[]) => void;
    "prefix-click": (...args: any[]) => void;
    "append-click": (...args: any[]) => void;
    "suffix-click": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
        type: import("vue").PropType<"number" | "textarea" | "text" | "tel" | "password">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: import("vue").PropType<"small" | "medium" | "large">;
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
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    suffix: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    prepend: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    append: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    activeType: {
        type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
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
        type: import("vue").PropType<"left" | "right" | "center">;
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
        type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
        default: string;
        validator(value: any): boolean;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    autosize: {
        type: import("vue").PropType<boolean | FieldAutosizeType>;
        default: boolean;
        validator(value: any): boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    onKeydown?: ((...args: any[]) => any) | undefined;
    onKeyup?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
    "onPrepend-click"?: ((...args: any[]) => any) | undefined;
    "onPrefix-click"?: ((...args: any[]) => any) | undefined;
    "onAppend-click"?: ((...args: any[]) => any) | undefined;
    "onSuffix-click"?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string | number;
    name: string;
    type: "number" | "textarea" | "text" | "tel" | "password";
    disabled: boolean;
    size: "small" | "medium" | "large";
    round: boolean;
    align: "left" | "right" | "center";
    placeholder: string;
    activeType: "info" | "success" | "warn" | "error" | "primary";
    activeColor: string;
    clearable: boolean;
    square: boolean;
    inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
    maxlength: number;
    readonly: boolean;
    prefix: string | IconPropsType;
    suffix: string | IconPropsType;
    prepend: string | IconPropsType;
    append: string | IconPropsType;
    autofocus: boolean;
    rows: number;
    autosize: boolean | FieldAutosizeType;
}, {}>, {
    prepend?(_: {}): any;
    prefix?(_: {}): any;
    suffix?(_: {}): any;
    append?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
