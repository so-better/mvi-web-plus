export type * from './props';
declare const Button: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        type: {
            type: import('vue').PropType<"default" | "info" | "success" | "error" | "warn" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        size: {
            type: import('vue').PropType<"mini" | "small" | "medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        nativeType: {
            type: import('vue').PropType<HTMLButtonElement["type"]>;
            default: string;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
        tag: {
            type: StringConstructor;
            default: string;
        };
        plain: {
            type: BooleanConstructor;
            default: boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        loadText: {
            type: StringConstructor;
            default: string;
        };
        loadIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: () => {
                type: string;
                spin: boolean;
            };
        };
    }>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        type: {
            type: import('vue').PropType<"default" | "info" | "success" | "error" | "warn" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        size: {
            type: import('vue').PropType<"mini" | "small" | "medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        nativeType: {
            type: import('vue').PropType<HTMLButtonElement["type"]>;
            default: string;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
        tag: {
            type: StringConstructor;
            default: string;
        };
        plain: {
            type: BooleanConstructor;
            default: boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        loadText: {
            type: StringConstructor;
            default: string;
        };
        loadIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: () => {
                type: string;
                spin: boolean;
            };
        };
    }>>, {
        size: "small" | "medium" | "large" | "mini";
        type: "default" | "info" | "success" | "warn" | "error" | "primary";
        round: boolean;
        loading: boolean;
        active: boolean;
        disabled: boolean;
        square: boolean;
        block: boolean;
        nativeType: "button" | "reset" | "submit";
        tag: string;
        plain: boolean;
        loadText: string;
        loadIcon: string | import('../icon').IconPropsType;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        type: {
            type: import('vue').PropType<"default" | "info" | "success" | "error" | "warn" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        size: {
            type: import('vue').PropType<"mini" | "small" | "medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        nativeType: {
            type: import('vue').PropType<HTMLButtonElement["type"]>;
            default: string;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
        tag: {
            type: StringConstructor;
            default: string;
        };
        plain: {
            type: BooleanConstructor;
            default: boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        loadText: {
            type: StringConstructor;
            default: string;
        };
        loadIcon: {
            type: import('vue').PropType<string | import('../icon').IconPropsType>;
            default: () => {
                type: string;
                spin: boolean;
            };
        };
    }>>, {}, {}, {}, {}, {
        size: "small" | "medium" | "large" | "mini";
        type: "default" | "info" | "success" | "warn" | "error" | "primary";
        round: boolean;
        loading: boolean;
        active: boolean;
        disabled: boolean;
        square: boolean;
        block: boolean;
        nativeType: "button" | "reset" | "submit";
        tag: string;
        plain: boolean;
        loadText: string;
        loadIcon: string | import('../icon').IconPropsType;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    type: {
        type: import('vue').PropType<"default" | "info" | "success" | "error" | "warn" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: import('vue').PropType<"mini" | "small" | "medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: import('vue').PropType<HTMLButtonElement["type"]>;
        default: string;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadText: {
        type: StringConstructor;
        default: string;
    };
    loadIcon: {
        type: import('vue').PropType<string | import('../icon').IconPropsType>;
        default: () => {
            type: string;
            spin: boolean;
        };
    };
}>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    size: "small" | "medium" | "large" | "mini";
    type: "default" | "info" | "success" | "warn" | "error" | "primary";
    round: boolean;
    loading: boolean;
    active: boolean;
    disabled: boolean;
    square: boolean;
    block: boolean;
    nativeType: "button" | "reset" | "submit";
    tag: string;
    plain: boolean;
    loadText: string;
    loadIcon: string | import('../icon').IconPropsType;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        loading?(_: {}): any;
        default?(_: {}): any;
    };
})>;
export { Button, Button as default };
