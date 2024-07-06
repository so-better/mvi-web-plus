import { IconPropsType } from '../icon';

declare function __VLS_template(): {
    loading?(_: {}): any;
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    type: {
        type: import('vue').PropType<"default" | "info" | "success" | "error" | "warn" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: import('vue').PropType<"mini" | "small" | "medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: import('vue').PropType<HTMLButtonElement["type"]>;
        default: string;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadText: {
        type: StringConstructor;
        default: string;
    };
    loadIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: () => {
            type: string;
            spin: boolean;
        };
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    type: {
        type: import('vue').PropType<"default" | "info" | "success" | "error" | "warn" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: import('vue').PropType<"mini" | "small" | "medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: import('vue').PropType<HTMLButtonElement["type"]>;
        default: string;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadText: {
        type: StringConstructor;
        default: string;
    };
    loadIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: () => {
            type: string;
            spin: boolean;
        };
    };
}>>, {
    size: "small" | "medium" | "large" | "mini";
    type: "default" | "info" | "success" | "warn" | "error" | "primary";
    round: boolean;
    loading: boolean;
    active: boolean;
    disabled: boolean;
    square: boolean;
    block: boolean;
    nativeType: "button" | "reset" | "submit";
    tag: string;
    plain: boolean;
    loadText: string;
    loadIcon: string | IconPropsType;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
