export type * from './props';
declare const Badge: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        content: {
            type: (StringConstructor | NumberConstructor)[];
            default: null;
        };
        placement: {
            type: import('vue').PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
            default: string;
            validator(value: any): boolean;
        };
        dot: {
            type: BooleanConstructor;
            default: boolean;
        };
        show: {
            type: BooleanConstructor;
            default: boolean;
        };
        offset: {
            type: import('vue').PropType<string[]>;
            default: () => null;
        };
        background: {
            type: StringConstructor;
            default: null;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        content: {
            type: (StringConstructor | NumberConstructor)[];
            default: null;
        };
        placement: {
            type: import('vue').PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
            default: string;
            validator(value: any): boolean;
        };
        dot: {
            type: BooleanConstructor;
            default: boolean;
        };
        show: {
            type: BooleanConstructor;
            default: boolean;
        };
        offset: {
            type: import('vue').PropType<string[]>;
            default: () => null;
        };
        background: {
            type: StringConstructor;
            default: null;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {
        color: string;
        show: boolean;
        placement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
        offset: string[];
        background: string;
        content: string | number;
        dot: boolean;
        block: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        content: {
            type: (StringConstructor | NumberConstructor)[];
            default: null;
        };
        placement: {
            type: import('vue').PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
            default: string;
            validator(value: any): boolean;
        };
        dot: {
            type: BooleanConstructor;
            default: boolean;
        };
        show: {
            type: BooleanConstructor;
            default: boolean;
        };
        offset: {
            type: import('vue').PropType<string[]>;
            default: () => null;
        };
        background: {
            type: StringConstructor;
            default: null;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {}, {}, {}, {}, {
        color: string;
        show: boolean;
        placement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
        offset: string[];
        background: string;
        content: string | number;
        dot: boolean;
        block: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    content: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    placement: {
        type: import('vue').PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
        default: string;
        validator(value: any): boolean;
    };
    dot: {
        type: BooleanConstructor;
        default: boolean;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    offset: {
        type: import('vue').PropType<string[]>;
        default: () => null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    color: string;
    show: boolean;
    placement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    offset: string[];
    background: string;
    content: string | number;
    dot: boolean;
    block: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { Badge, Badge as default };
