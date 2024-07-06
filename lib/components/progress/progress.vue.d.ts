declare function __VLS_template(): {
    tip?(_: {
        value: number;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    value: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    strokeWidth: {
        type: StringConstructor;
        default: null;
    };
    showTip: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    tipColor: {
        type: StringConstructor;
        default: null;
    };
    trackColor: {
        type: StringConstructor;
        default: null;
    };
    tipText: {
        type: StringConstructor;
        default: null;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    animation: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    strokeWidth: {
        type: StringConstructor;
        default: null;
    };
    showTip: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    tipColor: {
        type: StringConstructor;
        default: null;
    };
    trackColor: {
        type: StringConstructor;
        default: null;
    };
    tipText: {
        type: StringConstructor;
        default: null;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    animation: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    color: string;
    timeout: number;
    round: boolean;
    animation: boolean;
    square: boolean;
    value: number;
    min: number;
    max: number;
    trackColor: string;
    showTip: boolean;
    tipText: string;
    strokeWidth: string;
    tipColor: string;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
