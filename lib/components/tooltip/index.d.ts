export type * from './props';
declare const Tooltip: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        placement: {
            type: import('vue').PropType<import('../layer').LayerPropsType["placement"]>;
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        borderColor: {
            type: StringConstructor;
            default: null;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        textColor: {
            type: StringConstructor;
            default: null;
        };
        trigger: {
            type: import('vue').PropType<"hover" | "click" | "custom">;
            default: string;
            validator(value: any): boolean;
        };
        offset: {
            type: StringConstructor;
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: StringConstructor;
            default: null;
        };
        showTriangle: {
            type: BooleanConstructor;
            default: boolean;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {
        showTooltip: () => void;
        hideTooltip: () => void;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        placement: {
            type: import('vue').PropType<import('../layer').LayerPropsType["placement"]>;
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        borderColor: {
            type: StringConstructor;
            default: null;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        textColor: {
            type: StringConstructor;
            default: null;
        };
        trigger: {
            type: import('vue').PropType<"hover" | "click" | "custom">;
            default: string;
            validator(value: any): boolean;
        };
        offset: {
            type: StringConstructor;
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: StringConstructor;
            default: null;
        };
        showTriangle: {
            type: BooleanConstructor;
            default: boolean;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {
        title: string;
        zIndex: number;
        color: string;
        timeout: number;
        placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
        width: string;
        offset: string;
        disabled: boolean;
        borderColor: string;
        showTriangle: boolean;
        animation: string;
        block: boolean;
        trigger: "click" | "hover" | "custom";
        textColor: string;
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
        placement: {
            type: import('vue').PropType<import('../layer').LayerPropsType["placement"]>;
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        borderColor: {
            type: StringConstructor;
            default: null;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        textColor: {
            type: StringConstructor;
            default: null;
        };
        trigger: {
            type: import('vue').PropType<"hover" | "click" | "custom">;
            default: string;
            validator(value: any): boolean;
        };
        offset: {
            type: StringConstructor;
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: StringConstructor;
            default: null;
        };
        showTriangle: {
            type: BooleanConstructor;
            default: boolean;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {
        showTooltip: () => void;
        hideTooltip: () => void;
    }, {}, {}, {}, {
        title: string;
        zIndex: number;
        color: string;
        timeout: number;
        placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
        width: string;
        offset: string;
        disabled: boolean;
        borderColor: string;
        showTriangle: boolean;
        animation: string;
        block: boolean;
        trigger: "click" | "hover" | "custom";
        textColor: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: import('vue').PropType<import('../layer').LayerPropsType["placement"]>;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    borderColor: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    textColor: {
        type: StringConstructor;
        default: null;
    };
    trigger: {
        type: import('vue').PropType<"hover" | "click" | "custom">;
        default: string;
        validator(value: any): boolean;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: StringConstructor;
        default: null;
    };
    showTriangle: {
        type: BooleanConstructor;
        default: boolean;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    showTooltip: () => void;
    hideTooltip: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {
    title: string;
    zIndex: number;
    color: string;
    timeout: number;
    placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
    width: string;
    offset: string;
    disabled: boolean;
    borderColor: string;
    showTriangle: boolean;
    animation: string;
    block: boolean;
    trigger: "click" | "hover" | "custom";
    textColor: string;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
        title?(_: {}): any;
    };
})>;
export { Tooltip, Tooltip as default };
