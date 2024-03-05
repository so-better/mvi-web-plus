import { DefineComponent } from 'vue';
declare const _default: DefineComponent<{
    modelValue: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor | NumberConstructor)[];
        default: null;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
    options: {
        type: import("vue").PropType<import("./OptionsItem").OptionsItem[]>;
        default: () => never[];
    };
    selectedClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectedIcon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    $$el: import("vue").ComputedRef<any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    "update:show": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor | NumberConstructor)[];
        default: null;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
    options: {
        type: import("vue").PropType<import("./OptionsItem").OptionsItem[]>;
        default: () => never[];
    };
    selectedClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectedIcon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onSelect?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    "onUpdate:show"?: ((...args: any[]) => any) | undefined;
}, {
    placement: string;
    show: boolean;
    modelValue: string | number | Record<string, any> | unknown[];
    zIndex: number;
    timeout: number;
    closable: boolean;
    activeColor: string;
    round: boolean;
    active: boolean;
    mountEl: string;
    usePadding: boolean;
    overlayColor: string;
    options: import("./OptionsItem").OptionsItem[];
    selectedClose: boolean;
    selectedIcon: string | Record<string, any>;
}, {}>;
export default _default;
