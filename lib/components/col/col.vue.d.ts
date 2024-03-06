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
        type: (NumberConstructor | ObjectConstructor)[];
        default: null;
    };
    sm: {
        type: (NumberConstructor | ObjectConstructor)[];
        default: null;
    };
    md: {
        type: (NumberConstructor | ObjectConstructor)[];
        default: null;
    };
    lg: {
        type: (NumberConstructor | ObjectConstructor)[];
        default: null;
    };
    xl: {
        type: (NumberConstructor | ObjectConstructor)[];
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
        type: (NumberConstructor | ObjectConstructor)[];
        default: null;
    };
    sm: {
        type: (NumberConstructor | ObjectConstructor)[];
        default: null;
    };
    md: {
        type: (NumberConstructor | ObjectConstructor)[];
        default: null;
    };
    lg: {
        type: (NumberConstructor | ObjectConstructor)[];
        default: null;
    };
    xl: {
        type: (NumberConstructor | ObjectConstructor)[];
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
