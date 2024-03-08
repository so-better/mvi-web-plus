declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: import("vue").PropType<string | import("../icon/props").IconPropsType>;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: import("vue").PropType<"left" | "right">;
        default: string;
        validator(value: any): boolean;
    };
}, {
    show: boolean;
    firstShow: boolean;
    back: boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: import("vue").PropType<string | import("../icon/props").IconPropsType>;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: import("vue").PropType<"left" | "right">;
        default: string;
        validator(value: any): boolean;
    };
}>>, {
    title: string;
    disabled: boolean;
    icon: string | import("../icon/props").IconPropsType;
    placement: "left" | "right";
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
