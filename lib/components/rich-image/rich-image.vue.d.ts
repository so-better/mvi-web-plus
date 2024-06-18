declare const _default: import("vue").DefineComponent<{
    src: {
        type: StringConstructor;
        default: string;
    };
    loadIcon: {
        type: import("vue").PropType<string | import('../../index').IconPropsType>;
        default: null;
    };
    errorIcon: {
        type: import("vue").PropType<string | import('../../index').IconPropsType>;
        default: null;
    };
    maxScale: {
        type: NumberConstructor;
        default: number;
    };
    minScale: {
        type: NumberConstructor;
        default: number;
    };
}, {
    leftRotate: () => void;
    rightRotate: () => void;
    scaleUp: () => void;
    scaleDown: () => void;
    reset: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    reset: (...args: any[]) => void;
    "double-touchstart": (...args: any[]) => void;
    "double-touchend": (...args: any[]) => void;
    "translate-touchstart": (...args: any[]) => void;
    "translate-touchend": (...args: any[]) => void;
    "translate-mousedown": (...args: any[]) => void;
    "translate-mouseup": (...args: any[]) => void;
    "only-click": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    src: {
        type: StringConstructor;
        default: string;
    };
    loadIcon: {
        type: import("vue").PropType<string | import('../../index').IconPropsType>;
        default: null;
    };
    errorIcon: {
        type: import("vue").PropType<string | import('../../index').IconPropsType>;
        default: null;
    };
    maxScale: {
        type: NumberConstructor;
        default: number;
    };
    minScale: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    onReset?: ((...args: any[]) => any) | undefined;
    "onDouble-touchstart"?: ((...args: any[]) => any) | undefined;
    "onDouble-touchend"?: ((...args: any[]) => any) | undefined;
    "onTranslate-touchstart"?: ((...args: any[]) => any) | undefined;
    "onTranslate-touchend"?: ((...args: any[]) => any) | undefined;
    "onTranslate-mousedown"?: ((...args: any[]) => any) | undefined;
    "onTranslate-mouseup"?: ((...args: any[]) => any) | undefined;
    "onOnly-click"?: ((...args: any[]) => any) | undefined;
}, {
    src: string;
    loadIcon: string | import('../../index').IconPropsType;
    errorIcon: string | import('../../index').IconPropsType;
    maxScale: number;
    minScale: number;
}, {}>;
export default _default;
