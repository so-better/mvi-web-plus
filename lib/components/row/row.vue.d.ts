declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    justify: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    justify: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    align: string;
    tag: string;
    justify: string;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
