import { IconPropsType } from '../icon';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    type: {
        type: StringConstructor;
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
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxlength: {
        type: NumberConstructor;
        default: number;
    };
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    cancelText: {
        type: StringConstructor;
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
    align: {
        type: import('vue').PropType<"left" | "center" | "right">;
        default: string;
        validator(value: any): boolean;
    };
    leftIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: null;
    };
    rightIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: null;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputMode: {
        type: import('vue').PropType<"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url">;
        default: string;
        validator(value: any): boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    clear: (...args: any[]) => void;
    input: (...args: any[]) => void;
    search: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    focus: (...args: any[]) => void;
    blur: (...args: any[]) => void;
    "left-click": (...args: any[]) => void;
    "right-click": (...args: any[]) => void;
    keydown: (...args: any[]) => void;
    keyup: (...args: any[]) => void;
    cancel: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    type: {
        type: StringConstructor;
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
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxlength: {
        type: NumberConstructor;
        default: number;
    };
    autofocus: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    cancelText: {
        type: StringConstructor;
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
    align: {
        type: import('vue').PropType<"left" | "center" | "right">;
        default: string;
        validator(value: any): boolean;
    };
    leftIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: null;
    };
    rightIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: null;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    inputMode: {
        type: import('vue').PropType<"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url">;
        default: string;
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
    "onLeft-click"?: ((...args: any[]) => any) | undefined;
    "onRight-click"?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onSearch?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    modelValue: string | number;
    type: string;
    round: boolean;
    showCancel: boolean;
    cancelText: string;
    disabled: boolean;
    placeholder: string;
    clearable: boolean;
    leftIcon: string | IconPropsType;
    rightIcon: string | IconPropsType;
    align: "left" | "right" | "center";
    inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
    maxlength: number;
    readonly: boolean;
    autofocus: boolean;
}, {}>;
export default _default;
