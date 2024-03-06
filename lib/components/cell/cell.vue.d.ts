declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    icon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    content: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: null;
    };
    arrow: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: null;
    };
    ellipsis: {
        type: (NumberConstructor | BooleanConstructor)[];
        default: null;
    };
    noWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    icon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    content: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: null;
    };
    arrow: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: null;
    };
    ellipsis: {
        type: (NumberConstructor | BooleanConstructor)[];
        default: null;
    };
    noWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    label: string;
    title: string;
    icon: string | Record<string, any>;
    active: boolean;
    border: boolean;
    content: string;
    arrow: string | Record<string, any>;
    ellipsis: number | boolean;
    noWrap: boolean;
}, {}>, {
    title?(_: {}): any;
    content?(_: {}): any;
    label?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};