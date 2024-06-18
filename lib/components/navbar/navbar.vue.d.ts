import { IconPropsType } from '../icon/props';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: null;
    };
    leftText: {
        type: StringConstructor;
        default: null;
    };
    rightText: {
        type: StringConstructor;
        default: null;
    };
    leftIcon: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    rightIcon: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "left-click": (...args: any[]) => void;
    "right-click": (...args: any[]) => void;
    "title-click": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: null;
    };
    leftText: {
        type: StringConstructor;
        default: null;
    };
    rightText: {
        type: StringConstructor;
        default: null;
    };
    leftIcon: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    rightIcon: {
        type: import("vue").PropType<string | IconPropsType>;
        default: null;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    "onLeft-click"?: ((...args: any[]) => any) | undefined;
    "onRight-click"?: ((...args: any[]) => any) | undefined;
    "onTitle-click"?: ((...args: any[]) => any) | undefined;
}, {
    zIndex: number;
    fixed: boolean;
    title: string;
    border: boolean;
    leftIcon: string | IconPropsType;
    rightIcon: string | IconPropsType;
    leftText: string;
    rightText: string;
}, {}>, {
    left?(_: {}): any;
    title?(_: {}): any;
    right?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
