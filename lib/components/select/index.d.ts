export type * from './props';
declare const Select: import('../../utils').SFCWithInstall<import('vue').DefineComponent<{
    modelValue: {
        type: import('vue').PropType<any>;
        default: null;
    };
    options: {
        type: import('vue').PropType<any[]>;
        default: never[];
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
    layerProps: {
        type: import('vue').PropType<import('../layer').LayerPropsType>;
        default: () => {};
    };
    height: {
        type: StringConstructor;
        default: null;
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
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
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
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    filterMethod: {
        type: import('vue').PropType<(label: string | string[]) => string>;
        default: null;
    };
    showSelected: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectedIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: import('vue').PropType<import('./props').SelectOptionsItemPropsType>;
        default: () => {
            label: string;
            value: string;
        };
    };
    emptyText: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    clear: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: import('vue').PropType<any>;
        default: null;
    };
    options: {
        type: import('vue').PropType<any[]>;
        default: never[];
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
    layerProps: {
        type: import('vue').PropType<import('../layer').LayerPropsType>;
        default: () => {};
    };
    height: {
        type: StringConstructor;
        default: null;
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
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
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
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    filterMethod: {
        type: import('vue').PropType<(label: string | string[]) => string>;
        default: null;
    };
    showSelected: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectedIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    props: {
        type: import('vue').PropType<import('./props').SelectOptionsItemPropsType>;
        default: () => {
            label: string;
            value: string;
        };
    };
    emptyText: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
}, {
    size: "small" | "medium" | "large";
    height: string;
    name: string;
    props: import('./props').SelectOptionsItemPropsType;
    modelValue: any;
    disabled: boolean;
    icon: string;
    round: boolean;
    options: any[];
    placeholder: string;
    activeType: "info" | "success" | "warn" | "error" | "primary";
    activeColor: string;
    filterMethod: (label: string | string[]) => string;
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
    square: boolean;
    selectedIcon: string | import('../icon').IconPropsType;
    multiple: boolean;
    showSelected: boolean;
    emptyText: string;
}, {}>>;
export { Select, Select as default };
