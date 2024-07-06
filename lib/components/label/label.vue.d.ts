declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    type: {
        type: import('vue').PropType<"default" | "error" | "info" | "primary" | "success" | "warn">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: import('vue').PropType<"medium" | "large">;
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
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    type: {
        type: import('vue').PropType<"default" | "error" | "info" | "primary" | "success" | "warn">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: import('vue').PropType<"medium" | "large">;
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
    size: "medium" | "large";
    mark: boolean;
    reverse: boolean;
    closable: boolean;
    type: "default" | "info" | "success" | "warn" | "error" | "primary";
    round: boolean;
    plain: boolean;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
