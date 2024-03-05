import { DefineComponent } from 'vue';
declare const _default: DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    list: {
        type: ArrayConstructor;
        default: () => never[];
    };
    activeType: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
        validator(value: any): any;
    };
    filterMethod: {
        type: (BooleanConstructor | FunctionConstructor)[];
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
        type: ObjectConstructor;
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
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    rightIcon: {
        type: (StringConstructor | ObjectConstructor)[];
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
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (...args: any[]) => void;
    select: (...args: any[]) => void;
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
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    list: {
        type: ArrayConstructor;
        default: () => never[];
    };
    activeType: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
        validator(value: any): any;
    };
    filterMethod: {
        type: (BooleanConstructor | FunctionConstructor)[];
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
        type: ObjectConstructor;
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
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    rightIcon: {
        type: (StringConstructor | ObjectConstructor)[];
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
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
}>> & {
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
    onKeydown?: ((...args: any[]) => any) | undefined;
    onKeyup?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
    "onLeft-click"?: ((...args: any[]) => any) | undefined;
    "onRight-click"?: ((...args: any[]) => any) | undefined;
}, {
    size: string;
    modelValue: string;
    name: string;
    align: string;
    disabled: boolean;
    height: string;
    list: unknown[];
    placeholder: string;
    activeType: string;
    activeColor: string;
    filterMethod: boolean | Function;
    clearable: boolean;
    layerProps: Record<string, any>;
    leftIcon: string | Record<string, any>;
    rightIcon: string | Record<string, any>;
    round: boolean;
    square: boolean;
}, {}>;
export default _default;
