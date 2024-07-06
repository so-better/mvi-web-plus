declare function __VLS_template(): {
    default?(_: {}): any;
    title?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: import('vue').PropType<import('../layer').LayerPropsType["placement"]>;
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
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    textColor: {
        type: StringConstructor;
        default: null;
    };
    trigger: {
        type: import('vue').PropType<"hover" | "click" | "custom">;
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
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: import('vue').PropType<import('../layer').LayerPropsType["placement"]>;
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
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    textColor: {
        type: StringConstructor;
        default: null;
    };
    trigger: {
        type: import('vue').PropType<"hover" | "click" | "custom">;
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
    title: string;
    zIndex: number;
    color: string;
    timeout: number;
    placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
    width: string;
    offset: string;
    disabled: boolean;
    borderColor: string;
    showTriangle: boolean;
    animation: string;
    block: boolean;
    trigger: "click" | "hover" | "custom";
    textColor: string;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
