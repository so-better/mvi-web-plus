export type * from './props';
declare const Skeleton: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        rows: {
            type: NumberConstructor;
            default: number;
            validator(value: number): boolean;
        };
        rowWidth: {
            type: import('vue').PropType<string | string[]>;
            default: null;
        };
        avatar: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: BooleanConstructor;
            default: boolean;
        };
        titleWidth: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: BooleanConstructor;
            default: boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        avatarSize: {
            type: StringConstructor;
            default: null;
        };
        avatarRound: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        rows: {
            type: NumberConstructor;
            default: number;
            validator(value: number): boolean;
        };
        rowWidth: {
            type: import('vue').PropType<string | string[]>;
            default: null;
        };
        avatar: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: BooleanConstructor;
            default: boolean;
        };
        titleWidth: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: BooleanConstructor;
            default: boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        avatarSize: {
            type: StringConstructor;
            default: null;
        };
        avatarRound: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {
        title: boolean;
        round: boolean;
        loading: boolean;
        animation: boolean;
        rows: number;
        rowWidth: string | string[];
        avatar: boolean;
        titleWidth: string;
        avatarSize: string;
        avatarRound: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        rows: {
            type: NumberConstructor;
            default: number;
            validator(value: number): boolean;
        };
        rowWidth: {
            type: import('vue').PropType<string | string[]>;
            default: null;
        };
        avatar: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: BooleanConstructor;
            default: boolean;
        };
        titleWidth: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: BooleanConstructor;
            default: boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        avatarSize: {
            type: StringConstructor;
            default: null;
        };
        avatarRound: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {}, {}, {}, {}, {
        title: boolean;
        round: boolean;
        loading: boolean;
        animation: boolean;
        rows: number;
        rowWidth: string | string[];
        avatar: boolean;
        titleWidth: string;
        avatarSize: string;
        avatarRound: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    rows: {
        type: NumberConstructor;
        default: number;
        validator(value: number): boolean;
    };
    rowWidth: {
        type: import('vue').PropType<string | string[]>;
        default: null;
    };
    avatar: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: BooleanConstructor;
        default: boolean;
    };
    titleWidth: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    avatarSize: {
        type: StringConstructor;
        default: null;
    };
    avatarRound: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    title: boolean;
    round: boolean;
    loading: boolean;
    animation: boolean;
    rows: number;
    rowWidth: string | string[];
    avatar: boolean;
    titleWidth: string;
    avatarSize: string;
    avatarRound: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { Skeleton, Skeleton as default };
