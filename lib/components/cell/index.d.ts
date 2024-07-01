export type * from './props';
declare const Cell: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        icon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
    }>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        icon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
        border: boolean;
        icon: string | import('../icon').IconPropsType;
        active: boolean;
        content: string;
        arrow: string | import('../icon').IconPropsType;
        ellipsis: number | boolean;
        noWrap: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        icon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
    }>>, {}, {}, {}, {}, {
        label: string;
        title: string;
        border: boolean;
        icon: string | import('../icon').IconPropsType;
        active: boolean;
        content: string;
        arrow: string | import('../icon').IconPropsType;
        ellipsis: number | boolean;
        noWrap: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    icon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
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
}>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    label: string;
    title: string;
    border: boolean;
    icon: string | import('../icon').IconPropsType;
    active: boolean;
    content: string;
    arrow: string | import('../icon').IconPropsType;
    ellipsis: number | boolean;
    noWrap: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        title?(_: {}): any;
        content?(_: {}): any;
        label?(_: {}): any;
    };
})>;
export { Cell, Cell as default };
