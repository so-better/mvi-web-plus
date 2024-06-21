declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    content: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    placement: {
        type: import("vue").PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
        default: string;
        validator(value: any): boolean;
    };
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    offset: {
        type: import("vue").PropType<string[]>;
        default: () => null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    content: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    placement: {
        type: import("vue").PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
        default: string;
        validator(value: any): boolean;
    };
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    offset: {
        type: import("vue").PropType<string[]>;
        default: () => null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    color: string;
    show: boolean;
    placement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    offset: string[];
    background: string;
    content: string | number;
    dot: boolean;
    block: boolean;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
