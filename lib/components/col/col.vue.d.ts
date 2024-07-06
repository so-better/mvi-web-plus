import { ColResponsiveType } from './props';

declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    span: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    xs: {
        type: import('vue').PropType<number | ColResponsiveType>;
        default: null;
    };
    sm: {
        type: import('vue').PropType<number | ColResponsiveType>;
        default: null;
    };
    md: {
        type: import('vue').PropType<number | ColResponsiveType>;
        default: null;
    };
    lg: {
        type: import('vue').PropType<number | ColResponsiveType>;
        default: null;
    };
    xl: {
        type: import('vue').PropType<number | ColResponsiveType>;
        default: null;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    span: {
        type: NumberConstructor;
        default: number;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    xs: {
        type: import('vue').PropType<number | ColResponsiveType>;
        default: null;
    };
    sm: {
        type: import('vue').PropType<number | ColResponsiveType>;
        default: null;
    };
    md: {
        type: import('vue').PropType<number | ColResponsiveType>;
        default: null;
    };
    lg: {
        type: import('vue').PropType<number | ColResponsiveType>;
        default: null;
    };
    xl: {
        type: import('vue').PropType<number | ColResponsiveType>;
        default: null;
    };
}>>, {
    span: number;
    offset: number;
    tag: string;
    xs: number | ColResponsiveType;
    sm: number | ColResponsiveType;
    md: number | ColResponsiveType;
    lg: number | ColResponsiveType;
    xl: number | ColResponsiveType;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
