declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    span: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    xs: {
        type: (ObjectConstructor | NumberConstructor)[];
        default: null;
    };
    sm: {
        type: (ObjectConstructor | NumberConstructor)[];
        default: null;
    };
    md: {
        type: (ObjectConstructor | NumberConstructor)[];
        default: null;
    };
    lg: {
        type: (ObjectConstructor | NumberConstructor)[];
        default: null;
    };
    xl: {
        type: (ObjectConstructor | NumberConstructor)[];
        default: null;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    span: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    xs: {
        type: (ObjectConstructor | NumberConstructor)[];
        default: null;
    };
    sm: {
        type: (ObjectConstructor | NumberConstructor)[];
        default: null;
    };
    md: {
        type: (ObjectConstructor | NumberConstructor)[];
        default: null;
    };
    lg: {
        type: (ObjectConstructor | NumberConstructor)[];
        default: null;
    };
    xl: {
        type: (ObjectConstructor | NumberConstructor)[];
        default: null;
    };
}>>, {
    span: number;
    offset: number;
    tag: string;
    xs: number | Record<string, any>;
    sm: number | Record<string, any>;
    md: number | Record<string, any>;
    lg: number | Record<string, any>;
    xl: number | Record<string, any>;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
