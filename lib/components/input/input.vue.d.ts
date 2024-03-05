declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
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
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    labelOffset: {
        type: StringConstructor;
        default: null;
    };
    type: {
        type: StringConstructor;
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
        type: StringConstructor;
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
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    right: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    autosize: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: boolean;
        validator(value: any): boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    inputMode: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
        validator(value: any): boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (...args: any[]) => void;
    clear: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    focus: (...args: any[]) => void;
    blur: (...args: any[]) => void;
    "left-click": (...args: any[]) => void;
    "right-click": (...args: any[]) => void;
    keydown: (...args: any[]) => void;
    keyup: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    labelOffset: {
        type: StringConstructor;
        default: null;
    };
    type: {
        type: StringConstructor;
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
        type: StringConstructor;
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
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    right: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    autosize: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: boolean;
        validator(value: any): boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    inputMode: {
        type: (StringConstructor | BooleanConstructor)[];
        default: boolean;
        validator(value: any): boolean;
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    onKeydown?: ((...args: any[]) => any) | undefined;
    onKeyup?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
    "onLeft-click"?: ((...args: any[]) => any) | undefined;
    "onRight-click"?: ((...args: any[]) => any) | undefined;
}, {
    type: string;
    size: string;
    label: string;
    left: string | Record<string, any>;
    right: string | Record<string, any>;
    modelValue: string | number;
    border: boolean;
    name: string;
    align: string;
    disabled: boolean;
    placeholder: string;
    required: boolean;
    clearable: boolean;
    labelWidth: string;
    labelAlign: string;
    labelOffset: string;
    maxlength: number;
    readonly: boolean;
    autofocus: boolean;
    showWordLimit: boolean;
    rows: number;
    autosize: boolean | Record<string, any>;
    inputMode: string | boolean;
}, {}>, {
    left?(_: {}): any;
    right?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
