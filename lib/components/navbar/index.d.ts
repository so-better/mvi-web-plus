export type * from './props';
declare const Navbar: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        rightIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
    }, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "left-click": (...args: any[]) => void;
        "right-click": (...args: any[]) => void;
        "title-click": (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        rightIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
        fixed: boolean;
        border: boolean;
        leftIcon: string | import('../icon').IconPropsType;
        rightIcon: string | import('../icon').IconPropsType;
        leftText: string;
        rightText: string;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        rightIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
    }, {}, {}, {}, {}, {
        title: string;
        zIndex: number;
        fixed: boolean;
        border: boolean;
        leftIcon: string | import('../icon').IconPropsType;
        rightIcon: string | import('../icon').IconPropsType;
        leftText: string;
        rightText: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
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
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: null;
    };
    rightIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "left-click": (...args: any[]) => void;
    "right-click": (...args: any[]) => void;
    "title-click": (...args: any[]) => void;
}, string, {
    title: string;
    zIndex: number;
    fixed: boolean;
    border: boolean;
    leftIcon: string | import('../icon').IconPropsType;
    rightIcon: string | import('../icon').IconPropsType;
    leftText: string;
    rightText: string;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        left?(_: {}): any;
        title?(_: {}): any;
        right?(_: {}): any;
    };
})>;
export { Navbar, Navbar as default };
