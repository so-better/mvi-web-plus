declare const _default: {
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
};
export default _default;
