import { DefineComponent } from 'vue';
declare const _default: DefineComponent<{
    modelValue: {
        type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
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
    "update:modelValue": (...args: any[]) => void;
    select: (...args: any[]) => void;
    "update:show": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
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
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
    "onUpdate:show"?: ((...args: any[]) => any) | undefined;
}, {
    mountEl: string;
    zIndex: number;
    modelValue: string | number | Record<string, any> | unknown[];
    timeout: number;
    closable: boolean;
    usePadding: boolean;
    show: boolean;
    overlayColor: string;
    placement: string;
    round: boolean;
    options: import("./OptionsItem").OptionsItem[];
    active: boolean;
    activeColor: string;
    selectedClose: boolean;
    selectedIcon: string | Record<string, any>;
}, {}>;
export default _default;
