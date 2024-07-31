declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
    active: {
        type: NumberConstructor;
        default: number;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
    inactiveColor: {
        type: StringConstructor;
        default: null;
    };
    activeIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: string;
    };
    inactiveIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: null;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    active: {
        type: NumberConstructor;
        default: number;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
    inactiveColor: {
        type: StringConstructor;
        default: null;
    };
    activeIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: string;
    };
    inactiveIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: null;
    };
}>>, {
    active: number;
    activeColor: string;
    vertical: boolean;
    activeIcon: string | import('../icon').IconPropsType;
    inactiveIcon: string | import('../icon').IconPropsType;
    inactiveColor: string;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
