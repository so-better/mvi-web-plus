import { IconPropsType } from '../icon';

declare function __VLS_template(): {
    title?(_: {}): any;
    content?(_: {}): any;
    label?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    icon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    content: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: null;
    };
    arrow: {
        type: import('vue').PropType<string | IconPropsType>;
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: null;
    };
    ellipsis: {
        type: (BooleanConstructor | NumberConstructor)[];
        default: null;
    };
    noWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    icon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    content: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: null;
    };
    arrow: {
        type: import('vue').PropType<string | IconPropsType>;
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: null;
    };
    ellipsis: {
        type: (BooleanConstructor | NumberConstructor)[];
        default: null;
    };
    noWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    label: string;
    title: string;
    icon: string | IconPropsType;
    active: boolean;
    border: boolean;
    content: string;
    arrow: string | IconPropsType;
    ellipsis: number | boolean;
    noWrap: boolean;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
