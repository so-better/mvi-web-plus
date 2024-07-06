export type * from './props';
declare const CollapseItem: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        icon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        label: {
            type: StringConstructor;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        content: {
            type: StringConstructor;
            default: string;
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
        label: {
            type: StringConstructor;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        content: {
            type: StringConstructor;
            default: string;
        };
    }>>, {
        label: string;
        title: string;
        icon: string | import('../icon').IconPropsType;
        disabled: boolean;
        content: string;
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
        label: {
            type: StringConstructor;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        content: {
            type: StringConstructor;
            default: string;
        };
    }>>, {}, {}, {}, {}, {
        label: string;
        title: string;
        icon: string | import('../icon').IconPropsType;
        disabled: boolean;
        content: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    icon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
}>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    label: string;
    title: string;
    icon: string | import('../icon').IconPropsType;
    disabled: boolean;
    content: string;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { CollapseItem, CollapseItem as default };
