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
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    rightIcon: {
        type: (StringConstructor | ObjectConstructor)[];
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
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    rightIcon: {
        type: (StringConstructor | ObjectConstructor)[];
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
    title: string;
    zIndex: number;
    border: boolean;
    leftIcon: string | Record<string, any>;
    rightIcon: string | Record<string, any>;
    leftText: string;
    rightText: string;
    fixed: boolean;
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
