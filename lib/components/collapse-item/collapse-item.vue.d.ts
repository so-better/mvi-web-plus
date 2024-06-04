declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
    icon: {
        type: import('vue').PropType<string | import('../..').IconPropsType>;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    icon: {
        type: import('vue').PropType<string | import('../..').IconPropsType>;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    label: string;
    title: string;
    disabled: boolean;
    icon: string | import('../..').IconPropsType;
    content: string;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
