declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    align: {
        type: StringConstructor;
        default: null;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    labelWidth: {
        type: StringConstructor;
        default: null;
    };
    labelOffset: {
        type: StringConstructor;
        default: null;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    align: {
        type: StringConstructor;
        default: null;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    labelWidth: {
        type: StringConstructor;
        default: null;
    };
    labelOffset: {
        type: StringConstructor;
        default: null;
    };
}>>, {
    label: string;
    width: string;
    align: string;
    labelWidth: string;
    labelOffset: string;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
