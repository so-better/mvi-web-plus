declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    mark: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    mark: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    reverse: boolean;
    closable: boolean;
    type: string;
    mark: boolean;
    size: string;
    round: boolean;
    plain: boolean;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};