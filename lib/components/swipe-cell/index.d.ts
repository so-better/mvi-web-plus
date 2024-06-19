declare const SwipeCell: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        centerClose: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onClose?: ((...args: any[]) => any) | undefined;
        onOpen?: ((...args: any[]) => any) | undefined;
    }, {
        open: (placement?: "left" | "right") => void;
        close: () => void;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        close: (...args: any[]) => void;
        open: (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        centerClose: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onClose?: ((...args: any[]) => any) | undefined;
        onOpen?: ((...args: any[]) => any) | undefined;
    }, {
        disabled: boolean;
        centerClose: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        centerClose: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onClose?: ((...args: any[]) => any) | undefined;
        onOpen?: ((...args: any[]) => any) | undefined;
    }, {
        open: (placement?: "left" | "right") => void;
        close: () => void;
    }, {}, {}, {}, {
        disabled: boolean;
        centerClose: boolean;
    }>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    centerClose: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
}, {
    open: (placement?: "left" | "right") => void;
    close: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: (...args: any[]) => void;
    open: (...args: any[]) => void;
}, string, {
    disabled: boolean;
    centerClose: boolean;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        left?(_: {}): any;
        default?(_: {}): any;
        right?(_: {}): any;
    };
})>;
export type * from './props';
export { SwipeCell, SwipeCell as default };
