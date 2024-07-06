declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    width: {
        type: StringConstructor;
        default: null;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    labelBlock: {
        type: BooleanConstructor;
        default: boolean;
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
    width: {
        type: StringConstructor;
        default: null;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    align: {
        type: StringConstructor;
        default: string;
    };
    labelBlock: {
        type: BooleanConstructor;
        default: boolean;
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
    width: string;
    align: string;
    block: boolean;
    labelBlock: boolean;
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
