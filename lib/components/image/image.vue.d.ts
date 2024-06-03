import { IconPropsType } from '../icon/props';

declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
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
    alt: string;
    src: string;
    loadIcon: string | IconPropsType;
    root: string;
    fit: import('./props').ImageFillType;
    showError: boolean;
    showLoading: boolean;
    lazyLoad: boolean;
    errorIcon: string | IconPropsType;
}, {}>, {
    loading?(_: {}): any;
    error?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
