declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
    value: {
        type: NumberConstructor;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: NumberConstructor;
        default: number;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    trackColor: {
        type: StringConstructor;
        default: null;
    };
    fill: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    showTip: {
        type: BooleanConstructor;
        default: boolean;
    };
    tipText: {
        type: StringConstructor;
        default: null;
    };
    strokeWidth: {
        type: NumberConstructor;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    clockWise: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: {
        type: NumberConstructor;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    size: {
        type: NumberConstructor;
        default: number;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    trackColor: {
        type: StringConstructor;
        default: null;
    };
    fill: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    showTip: {
        type: BooleanConstructor;
        default: boolean;
    };
    tipText: {
        type: StringConstructor;
        default: null;
    };
    strokeWidth: {
        type: NumberConstructor;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    clockWise: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    size: number;
    fill: string;
    color: string;
    timeout: number;
    round: boolean;
    animation: boolean;
    value: number;
    min: number;
    max: number;
    trackColor: string;
    showTip: boolean;
    tipText: string;
    strokeWidth: number;
    clockWise: boolean;
}, {}>, {
    tip?(_: {
        value: number;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
