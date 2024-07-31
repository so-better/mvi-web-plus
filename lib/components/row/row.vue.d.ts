declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
    justify: {
        type: import('vue').PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
        default: string;
        validator(value: any): boolean;
    };
    align: {
        type: import('vue').PropType<"center" | "flex-start" | "flex-end">;
        default: string;
        validator(value: any): boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    justify: {
        type: import('vue').PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
        default: string;
        validator(value: any): boolean;
    };
    align: {
        type: import('vue').PropType<"center" | "flex-start" | "flex-end">;
        default: string;
        validator(value: any): boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    align: "center" | "flex-start" | "flex-end";
    tag: string;
    justify: "flex-start" | "flex-end" | "space-around" | "space-between";
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
