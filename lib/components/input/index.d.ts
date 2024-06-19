declare const Input: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
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
            type: import('vue').PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        labelOffset: {
            type: StringConstructor;
            default: null;
        };
        type: {
            type: import('vue').PropType<"number" | "textarea" | "text" | "password" | "tel">;
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
            type: import('vue').PropType<"medium" | "large">;
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        right: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        rows: {
            type: NumberConstructor;
            default: number;
        };
        autosize: {
            type: import('vue').PropType<boolean | import('./props').InputAutosizeType>;
            default: boolean;
            validator(value: any): boolean;
        };
        align: {
            type: import('vue').PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        inputMode: {
            type: import('vue').PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
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
    }, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        clear: (...args: any[]) => void;
        input: (...args: any[]) => void;
        "update:modelValue": (...args: any[]) => void;
        focus: (...args: any[]) => void;
        blur: (...args: any[]) => void;
        "left-click": (...args: any[]) => void;
        "right-click": (...args: any[]) => void;
        keydown: (...args: any[]) => void;
        keyup: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
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
            type: import('vue').PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        labelOffset: {
            type: StringConstructor;
            default: null;
        };
        type: {
            type: import('vue').PropType<"number" | "textarea" | "text" | "password" | "tel">;
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
            type: import('vue').PropType<"medium" | "large">;
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        right: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        rows: {
            type: NumberConstructor;
            default: number;
        };
        autosize: {
            type: import('vue').PropType<boolean | import('./props').InputAutosizeType>;
            default: boolean;
            validator(value: any): boolean;
        };
        align: {
            type: import('vue').PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        inputMode: {
            type: import('vue').PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
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
    }, {
        size: "medium" | "large";
        label: string;
        align: "left" | "right" | "center";
        border: boolean;
        name: string;
        type: "number" | "textarea" | "text" | "password" | "tel";
        modelValue: string | number;
        disabled: boolean;
        left: string | import('../icon').IconPropsType;
        right: string | import('../icon').IconPropsType;
        placeholder: string;
        clearable: boolean;
        inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
        maxlength: number;
        readonly: boolean;
        autofocus: boolean;
        rows: number;
        autosize: boolean | import('./props').InputAutosizeType;
        labelWidth: string;
        labelOffset: string;
        labelAlign: "left" | "right" | "center";
        required: boolean;
        showWordLimit: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
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
            type: import('vue').PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        labelOffset: {
            type: StringConstructor;
            default: null;
        };
        type: {
            type: import('vue').PropType<"number" | "textarea" | "text" | "password" | "tel">;
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
            type: import('vue').PropType<"medium" | "large">;
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        right: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        rows: {
            type: NumberConstructor;
            default: number;
        };
        autosize: {
            type: import('vue').PropType<boolean | import('./props').InputAutosizeType>;
            default: boolean;
            validator(value: any): boolean;
        };
        align: {
            type: import('vue').PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        inputMode: {
            type: import('vue').PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
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
    }, {}, {}, {}, {}, {
        size: "medium" | "large";
        label: string;
        align: "left" | "right" | "center";
        border: boolean;
        name: string;
        type: "number" | "textarea" | "text" | "password" | "tel";
        modelValue: string | number;
        disabled: boolean;
        left: string | import('../icon').IconPropsType;
        right: string | import('../icon').IconPropsType;
        placeholder: string;
        clearable: boolean;
        inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
        maxlength: number;
        readonly: boolean;
        autofocus: boolean;
        rows: number;
        autosize: boolean | import('./props').InputAutosizeType;
        labelWidth: string;
        labelOffset: string;
        labelAlign: "left" | "right" | "center";
        required: boolean;
        showWordLimit: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
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
        type: import('vue').PropType<"left" | "right" | "center">;
        default: string;
        validator(value: any): boolean;
    };
    labelOffset: {
        type: StringConstructor;
        default: null;
    };
    type: {
        type: import('vue').PropType<"number" | "textarea" | "text" | "password" | "tel">;
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
        type: import('vue').PropType<"medium" | "large">;
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
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: null;
    };
    right: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: null;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    autosize: {
        type: import('vue').PropType<boolean | import('./props').InputAutosizeType>;
        default: boolean;
        validator(value: any): boolean;
    };
    align: {
        type: import('vue').PropType<"left" | "right" | "center">;
        default: string;
        validator(value: any): boolean;
    };
    inputMode: {
        type: import('vue').PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
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
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    clear: (...args: any[]) => void;
    input: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    focus: (...args: any[]) => void;
    blur: (...args: any[]) => void;
    "left-click": (...args: any[]) => void;
    "right-click": (...args: any[]) => void;
    keydown: (...args: any[]) => void;
    keyup: (...args: any[]) => void;
}, string, {
    size: "medium" | "large";
    label: string;
    align: "left" | "right" | "center";
    border: boolean;
    name: string;
    type: "number" | "textarea" | "text" | "password" | "tel";
    modelValue: string | number;
    disabled: boolean;
    left: string | import('../icon').IconPropsType;
    right: string | import('../icon').IconPropsType;
    placeholder: string;
    clearable: boolean;
    inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
    maxlength: number;
    readonly: boolean;
    autofocus: boolean;
    rows: number;
    autosize: boolean | import('./props').InputAutosizeType;
    labelWidth: string;
    labelOffset: string;
    labelAlign: "left" | "right" | "center";
    required: boolean;
    showWordLimit: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        left?(_: {}): any;
        right?(_: {}): any;
    };
})>;
export type * from './props';
export { Input, Input as default };
