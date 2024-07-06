declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: import('vue').PropType<"left" | "right">;
        default: string;
        validator(value: any): boolean;
    };
}, {
    show: boolean;
    firstShow: boolean;
    back: boolean;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: import('vue').PropType<"left" | "right">;
        default: string;
        validator(value: any): boolean;
    };
}>>, {
    title: string;
    icon: string | import('../icon').IconPropsType;
    placement: "left" | "right";
    disabled: boolean;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
