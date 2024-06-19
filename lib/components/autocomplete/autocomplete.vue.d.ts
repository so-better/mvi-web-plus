import { IconPropsType } from '../icon';
import { LayerPropsType } from '../layer';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: import('vue').PropType<"small" | "medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    list: {
        type: import('vue').PropType<string[]>;
        default: () => never[];
    };
    activeType: {
        type: import('vue').PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
        validator(value: any): boolean;
    };
    filterMethod: {
        type: import('vue').PropType<boolean | ((value: string, list: string[]) => string[])>;
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
        type: import('vue').PropType<LayerPropsType>;
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
        type: import('vue').PropType<string | IconPropsType>;
        default: null;
    };
    rightIcon: {
        type: import('vue').PropType<string | IconPropsType>;
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
        type: import('vue').PropType<"left" | "right" | "center">;
        default: string;
        validator(value: any): boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    clear: (...args: any[]) => void;
    input: (...args: any[]) => void;
    select: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    focus: (...args: any[]) => void;
    blur: (...args: any[]) => void;
    "left-click": (...args: any[]) => void;
    "right-click": (...args: any[]) => void;
    keydown: (...args: any[]) => void;
    keyup: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: import('vue').PropType<"small" | "medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    list: {
        type: import('vue').PropType<string[]>;
        default: () => never[];
    };
    activeType: {
        type: import('vue').PropType<"info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
        validator(value: any): boolean;
    };
    filterMethod: {
        type: import('vue').PropType<boolean | ((value: string, list: string[]) => string[])>;
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
        type: import('vue').PropType<LayerPropsType>;
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
        type: import('vue').PropType<string | IconPropsType>;
        default: null;
    };
    rightIcon: {
        type: import('vue').PropType<string | IconPropsType>;
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
        type: import('vue').PropType<"left" | "right" | "center">;
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
    onSelect?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
    "onLeft-click"?: ((...args: any[]) => any) | undefined;
    "onRight-click"?: ((...args: any[]) => any) | undefined;
}, {
    size: "small" | "medium" | "large";
    align: "left" | "right" | "center";
    height: string;
    name: string;
    modelValue: string;
    disabled: boolean;
    round: boolean;
    placeholder: string;
    list: string[];
    activeType: "info" | "success" | "warn" | "error" | "primary";
    activeColor: string;
    filterMethod: boolean | ((value: string, list: string[]) => string[]);
    clearable: boolean;
    layerProps: {
        border?: boolean | undefined;
        width?: string | undefined;
        zIndex?: number | undefined;
        modelValue?: boolean | undefined;
        timeout?: number | undefined;
        closable?: boolean | undefined;
        placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
        offset?: string | undefined;
        background?: string | undefined;
        borderColor?: string | undefined;
        relate?: string | undefined;
        showTriangle?: boolean | undefined;
        animation?: string | undefined;
        shadow?: boolean | undefined;
    };
    leftIcon: string | IconPropsType;
    rightIcon: string | IconPropsType;
    square: boolean;
}, {}>;
export default _default;
