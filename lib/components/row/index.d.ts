export type * from './props';
declare const Row: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        justify: {
            type: import('vue').PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
            default: string;
            validator(value: any): boolean;
        };
        align: {
            type: import('vue').PropType<"center" | "flex-start" | "flex-end">;
            default: string;
            validator(value: any): boolean;
        };
        tag: {
            type: StringConstructor;
            default: string;
        };
    }>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        justify: {
            type: import('vue').PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
            default: string;
            validator(value: any): boolean;
        };
        align: {
            type: import('vue').PropType<"center" | "flex-start" | "flex-end">;
            default: string;
            validator(value: any): boolean;
        };
        tag: {
            type: StringConstructor;
            default: string;
        };
    }>>, {
        align: "center" | "flex-start" | "flex-end";
        tag: string;
        justify: "flex-start" | "flex-end" | "space-around" | "space-between";
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        justify: {
            type: import('vue').PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
            default: string;
            validator(value: any): boolean;
        };
        align: {
            type: import('vue').PropType<"center" | "flex-start" | "flex-end">;
            default: string;
            validator(value: any): boolean;
        };
        tag: {
            type: StringConstructor;
            default: string;
        };
    }>>, {}, {}, {}, {}, {
        align: "center" | "flex-start" | "flex-end";
        tag: string;
        justify: "flex-start" | "flex-end" | "space-around" | "space-between";
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    justify: {
        type: import('vue').PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
        default: string;
        validator(value: any): boolean;
    };
    align: {
        type: import('vue').PropType<"center" | "flex-start" | "flex-end">;
        default: string;
        validator(value: any): boolean;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}>>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    align: "center" | "flex-start" | "flex-end";
    tag: string;
    justify: "flex-start" | "flex-end" | "space-around" | "space-between";
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
})>;
export { Row, Row as default };
