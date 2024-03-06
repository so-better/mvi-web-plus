declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    borderColor: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    trigger: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    showTriangle: {
        type: BooleanConstructor;
        default: boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    showTooltip: () => void;
    hideTooltip: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    borderColor: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    trigger: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    showTriangle: {
        type: BooleanConstructor;
        default: boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    zIndex: number;
    color: string;
    timeout: number;
    title: string;
    disabled: boolean;
    placement: string;
    width: string;
    offset: string;
    borderColor: string;
    showTriangle: boolean;
    animation: string;
    block: boolean;
    textColor: string;
    trigger: string;
}, {}>, {
    default?(_: {}): any;
    title?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
