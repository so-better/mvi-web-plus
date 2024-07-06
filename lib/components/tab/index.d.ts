export type * from './props';
declare const Tab: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        icon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        placement: {
            type: import('vue').PropType<"left" | "right">;
            default: string;
            validator(value: any): boolean;
        };
    }>>, {
        show: boolean;
        firstShow: boolean;
        back: boolean;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        icon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        placement: {
            type: import('vue').PropType<"left" | "right">;
            default: string;
            validator(value: any): boolean;
        };
    }>>, {
        title: string;
        icon: string | import('../icon').IconPropsType;
        placement: "left" | "right";
        disabled: boolean;
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
            default: string;
        };
        icon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        placement: {
            type: import('vue').PropType<"left" | "right">;
            default: string;
            validator(value: any): boolean;
        };
    }>>, {
        show: boolean;
        firstShow: boolean;
        back: boolean;
    }, {}, {}, {}, {
        title: string;
        icon: string | import('../icon').IconPropsType;
        placement: "left" | "right";
        disabled: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: import('vue').PropType<"left" | "right">;
        default: string;
        validator(value: any): boolean;
    };
}>>, {
    show: boolean;
    firstShow: boolean;
    back: boolean;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    title: string;
    icon: string | import('../icon').IconPropsType;
    placement: "left" | "right";
    disabled: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { Tab, Tab as default };
