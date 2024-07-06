import { IconPropsType } from '../icon';

declare function __VLS_template(): {
    loading?(_: {}): any;
    error?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
    src: {
        type: StringConstructor;
        default: string;
    };
    fit: {
        type: import('vue').PropType<import('./props').ImageFillType>;
        default: string;
        validator(value: any): boolean;
    };
    alt: {
        type: StringConstructor;
        default: string;
    };
    showError: {
        type: BooleanConstructor;
        default: boolean;
    };
    showLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    lazyLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    root: {
        type: StringConstructor;
        default: null;
    };
    loadIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: string;
    };
    errorIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    height: {
        type: StringConstructor;
        default: null;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    success: (...args: any[]) => void;
    error: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    src: {
        type: StringConstructor;
        default: string;
    };
    fit: {
        type: import('vue').PropType<import('./props').ImageFillType>;
        default: string;
        validator(value: any): boolean;
    };
    alt: {
        type: StringConstructor;
        default: string;
    };
    showError: {
        type: BooleanConstructor;
        default: boolean;
    };
    showLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    lazyLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    root: {
        type: StringConstructor;
        default: null;
    };
    loadIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: string;
    };
    errorIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    height: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    onError?: ((...args: any[]) => any) | undefined;
    onSuccess?: ((...args: any[]) => any) | undefined;
}, {
    round: boolean;
    width: string;
    height: string;
    loadIcon: string | IconPropsType;
    root: string;
    src: string;
    fit: import('./props').ImageFillType;
    alt: string;
    showError: boolean;
    showLoading: boolean;
    lazyLoad: boolean;
    errorIcon: string | IconPropsType;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
