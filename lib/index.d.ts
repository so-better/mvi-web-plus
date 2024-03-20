import { App } from 'vue';
/***** 全局默认样式 *****/
import './css/mvi-default.less';
/***** 辅助样式 *****/
import './css/mvi-support.less';
/***** 指令 *****/
import { Anchor } from './directives/anchor';
import { Drag } from './directives/drag';
import { Observe } from './directives/observe';
import { Prop } from './directives/prop';
import { Px } from './directives/px';
import { Resize } from './directives/resize';
import { Ripple } from './directives/ripple';
import { Scroll } from './directives/scroll';
import { Spy } from './directives/spy';
import { Upload } from './directives/upload';
/***** 按需导出 *****/
export * from './directives/anchor';
export * from './directives/drag';
export * from './directives/observe';
export * from './directives/prop';
export * from './directives/px';
export * from './directives/resize';
export * from './directives/ripple';
export * from './directives/scroll';
export * from './directives/spy';
export * from './directives/upload';
export * from './components/icon';
export * from './components/badge';
export * from './components/button';
export * from './components/triangle';
export * from './components/layer';
export * from './components/label';
export * from './components/input';
export * from './components/loading';
export * from './components/loading-bar';
export * from './components/msgbox';
export * from './components/divider';
export * from './components/cell';
export * from './components/cell-group';
export * from './components/checkbox';
export * from './components/radio';
export * from './components/sign';
export * from './components/roll';
export * from './components/row';
export * from './components/col';
export * from './components/autocomplete';
export * from './components/overlay';
export * from './components/popup';
export * from './components/dropdown';
export * from './components/tooltip';
export * from './components/transition-slide';
export * from './components/switch';
export * from './components/navbar';
export * from './components/notify';
export * from './components/actionsheet';
export * from './components/calendar';
export * from './components/circle-progress';
export * from './components/collapse';
export * from './components/collapse-item';
export * from './components/date-chooser';
export * from './components/date-native-picker';
export * from './components/picker';
export * from './components/progress';
export * from './components/slider';
export * from './components/date-picker';
export * from './components/field';
export * from './components/form';
export * from './components/form-el';
export * from './components/image';
export * from './components/color-picker';
export * from './components/list';
export * from './components/modal';
export * from './components/page';
export * from './components/search';
export * from './components/select';
export * from './components/skeleton';
export * from './components/steps';
export * from './components/step';
export * from './components/stepper';
export * from './components/number-keyboard';
export * from './components/toast';
export * from './components/pull-refresh';
export * from './components/dialog';
export * from './components/swipe-cell';
export * from './components/tabbar';
export * from './components/table';
export * from './components/tabs';
export * from './components/tab';
export * from './components/carousel';
export * from './components/carousel-item';
export * from './components/rich-image';
export * from './components/image-preview';
export declare const components: {
    Anchor: typeof Anchor;
    Drag: typeof Drag;
    Observe: typeof Observe;
    Prop: typeof Prop;
    Px: typeof Px;
    Resize: typeof Resize;
    Ripple: typeof Ripple;
    Scroll: typeof Scroll;
    Spy: typeof Spy;
    Upload: typeof Upload;
    Icon: import("vue").DefineComponent<{
        type: {
            type: StringConstructor;
            default: string;
        };
        /***** 全局默认样式 *****/
        spin: {
            type: BooleanConstructor;
            default: boolean;
        }; /***** 辅助样式 *****/
        url: {
            type: StringConstructor;
            default: null;
        };
        size: {
            type: StringConstructor;
            default: null;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        type: {
            type: StringConstructor;
            default: string;
        };
        /***** 全局默认样式 *****/
        spin: {
            type: BooleanConstructor;
            default: boolean;
        }; /***** 辅助样式 *****/
        url: {
            type: StringConstructor;
            default: null;
        };
        size: {
            type: StringConstructor;
            default: null;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
    }>>, {
        color: string;
        type: string;
        size: string;
        spin: boolean;
        url: string;
    }, {}>;
    Badge: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            content: {
                type: (StringConstructor | NumberConstructor)[];
                default: null;
            };
            placement: {
                type: import("vue").PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
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
                type: import("vue").PropType<string[]>;
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
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            content: {
                type: (StringConstructor | NumberConstructor)[];
                default: null;
            };
            placement: {
                type: import("vue").PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
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
                type: import("vue").PropType<string[]>;
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
        }, Readonly<import("vue").ExtractPropTypes<{
            content: {
                type: (StringConstructor | NumberConstructor)[];
                default: null;
            };
            placement: {
                type: import("vue").PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
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
                type: import("vue").PropType<string[]>;
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
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        content: {
            type: (StringConstructor | NumberConstructor)[];
            default: null;
        };
        placement: {
            type: import("vue").PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
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
            type: import("vue").PropType<string[]>;
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
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        color: string;
        show: boolean;
        placement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
        offset: string[];
        background: string;
        content: string | number;
        dot: boolean;
        block: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Button: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            type: {
                type: import("vue").PropType<"default" | "info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            size: {
                type: import("vue").PropType<"small" | "medium" | "large" | "mini">;
                default: string;
                validator(value: any): boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            nativeType: {
                type: import("vue").PropType<"button" | "submit" | "reset">;
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
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: () => {
                    type: string;
                    spin: boolean;
                };
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            type: {
                type: import("vue").PropType<"default" | "info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            size: {
                type: import("vue").PropType<"small" | "medium" | "large" | "mini">;
                default: string;
                validator(value: any): boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            nativeType: {
                type: import("vue").PropType<"button" | "submit" | "reset">;
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
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: () => {
                    type: string;
                    spin: boolean;
                };
            };
        }>>, {
            type: "default" | "info" | "success" | "warn" | "error" | "primary";
            disabled: boolean;
            size: "small" | "medium" | "large" | "mini";
            round: boolean;
            loading: boolean;
            active: boolean;
            square: boolean;
            block: boolean;
            nativeType: "button" | "submit" | "reset";
            tag: string;
            plain: boolean;
            loadText: string;
            loadIcon: string | import("./components/icon/props").IconPropsType;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            type: {
                type: import("vue").PropType<"default" | "info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            size: {
                type: import("vue").PropType<"small" | "medium" | "large" | "mini">;
                default: string;
                validator(value: any): boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            nativeType: {
                type: import("vue").PropType<"button" | "submit" | "reset">;
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
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: () => {
                    type: string;
                    spin: boolean;
                };
            };
        }>>, {}, {}, {}, {}, {
            type: "default" | "info" | "success" | "warn" | "error" | "primary";
            disabled: boolean;
            size: "small" | "medium" | "large" | "mini";
            round: boolean;
            loading: boolean;
            active: boolean;
            square: boolean;
            block: boolean;
            nativeType: "button" | "submit" | "reset";
            tag: string;
            plain: boolean;
            loadText: string;
            loadIcon: string | import("./components/icon/props").IconPropsType;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        type: {
            type: import("vue").PropType<"default" | "info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        size: {
            type: import("vue").PropType<"small" | "medium" | "large" | "mini">;
            default: string;
            validator(value: any): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        nativeType: {
            type: import("vue").PropType<"button" | "submit" | "reset">;
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
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: () => {
                type: string;
                spin: boolean;
            };
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        type: "default" | "info" | "success" | "warn" | "error" | "primary";
        disabled: boolean;
        size: "small" | "medium" | "large" | "mini";
        round: boolean;
        loading: boolean;
        active: boolean;
        square: boolean;
        block: boolean;
        nativeType: "button" | "submit" | "reset";
        tag: string;
        plain: boolean;
        loadText: string;
        loadIcon: string | import("./components/icon/props").IconPropsType;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            loading?(_: {}): any;
            default?(_: {}): any;
        };
    });
    Triangle: import("vue").DefineComponent<{
        background: {
            type: StringConstructor;
            default: null;
        };
        borderColor: {
            type: StringConstructor;
            default: null;
        };
        size: {
            type: StringConstructor;
            default: string;
        };
        placement: {
            type: import("vue").PropType<"left" | "top" | "bottom" | "right">;
            default: string;
            validator(value: any): boolean;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        background: {
            type: StringConstructor;
            default: null;
        };
        borderColor: {
            type: StringConstructor;
            default: null;
        };
        size: {
            type: StringConstructor;
            default: string;
        };
        placement: {
            type: import("vue").PropType<"left" | "top" | "bottom" | "right">;
            default: string;
            validator(value: any): boolean;
        };
    }>>, {
        size: string;
        placement: "left" | "top" | "bottom" | "right";
        background: string;
        borderColor: string;
    }, {}>;
    Layer: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            relate: {
                type: StringConstructor;
                default: null;
            };
            placement: {
                type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end">;
                default: string;
                validator(value: any): boolean;
            };
            offset: {
                type: StringConstructor;
                default: string;
            };
            zIndex: {
                type: NumberConstructor;
                default: null;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            showTriangle: {
                type: BooleanConstructor;
                default: boolean;
            };
            animation: {
                type: StringConstructor;
                default: null;
            };
            shadow: {
                type: BooleanConstructor;
                default: boolean;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            borderColor: {
                type: StringConstructor;
                default: string;
            };
            background: {
                type: StringConstructor;
                default: string;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
            update: () => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            show: (...args: any[]) => void;
            showing: (...args: any[]) => void;
            shown: (...args: any[]) => void;
            hide: (...args: any[]) => void;
            hidding: (...args: any[]) => void;
            hidden: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            relate: {
                type: StringConstructor;
                default: null;
            };
            placement: {
                type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end">;
                default: string;
                validator(value: any): boolean;
            };
            offset: {
                type: StringConstructor;
                default: string;
            };
            zIndex: {
                type: NumberConstructor;
                default: null;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            showTriangle: {
                type: BooleanConstructor;
                default: boolean;
            };
            animation: {
                type: StringConstructor;
                default: null;
            };
            shadow: {
                type: BooleanConstructor;
                default: boolean;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            borderColor: {
                type: StringConstructor;
                default: string;
            };
            background: {
                type: StringConstructor;
                default: string;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            zIndex: number;
            modelValue: boolean;
            timeout: number;
            closable: boolean;
            placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end";
            width: string;
            offset: string;
            background: string;
            borderColor: string;
            relate: string;
            showTriangle: boolean;
            animation: string;
            shadow: boolean;
            border: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            relate: {
                type: StringConstructor;
                default: null;
            };
            placement: {
                type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end">;
                default: string;
                validator(value: any): boolean;
            };
            offset: {
                type: StringConstructor;
                default: string;
            };
            zIndex: {
                type: NumberConstructor;
                default: null;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            showTriangle: {
                type: BooleanConstructor;
                default: boolean;
            };
            animation: {
                type: StringConstructor;
                default: null;
            };
            shadow: {
                type: BooleanConstructor;
                default: boolean;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            borderColor: {
                type: StringConstructor;
                default: string;
            };
            background: {
                type: StringConstructor;
                default: string;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
            update: () => void;
        }, {}, {}, {}, {
            zIndex: number;
            modelValue: boolean;
            timeout: number;
            closable: boolean;
            placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end";
            width: string;
            offset: string;
            background: string;
            borderColor: string;
            relate: string;
            showTriangle: boolean;
            animation: string;
            shadow: boolean;
            border: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        relate: {
            type: StringConstructor;
            default: null;
        };
        placement: {
            type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end">;
            default: string;
            validator(value: any): boolean;
        };
        offset: {
            type: StringConstructor;
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: null;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        showTriangle: {
            type: BooleanConstructor;
            default: boolean;
        };
        animation: {
            type: StringConstructor;
            default: null;
        };
        shadow: {
            type: BooleanConstructor;
            default: boolean;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        borderColor: {
            type: StringConstructor;
            default: string;
        };
        background: {
            type: StringConstructor;
            default: string;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onShowing?: ((...args: any[]) => any) | undefined;
        onShown?: ((...args: any[]) => any) | undefined;
        onHide?: ((...args: any[]) => any) | undefined;
        onHidding?: ((...args: any[]) => any) | undefined;
        onHidden?: ((...args: any[]) => any) | undefined;
    }, {
        $$el: import("vue").ComputedRef<HTMLElement | null>;
        update: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        show: (...args: any[]) => void;
        showing: (...args: any[]) => void;
        shown: (...args: any[]) => void;
        hide: (...args: any[]) => void;
        hidding: (...args: any[]) => void;
        hidden: (...args: any[]) => void;
    }, string, {
        zIndex: number;
        modelValue: boolean;
        timeout: number;
        closable: boolean;
        placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end";
        width: string;
        offset: string;
        background: string;
        borderColor: string;
        relate: string;
        showTriangle: boolean;
        animation: string;
        shadow: boolean;
        border: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Label: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            type: {
                type: import("vue").PropType<"default" | "info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            size: {
                type: import("vue").PropType<"medium" | "large">;
                default: string;
                validator(value: any): boolean;
            };
            plain: {
                type: BooleanConstructor;
                default: boolean;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            mark: {
                type: BooleanConstructor;
                default: boolean;
            };
            /***** 组件 *****/
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            reverse: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            type: {
                type: import("vue").PropType<"default" | "info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            size: {
                type: import("vue").PropType<"medium" | "large">;
                default: string;
                validator(value: any): boolean;
            };
            plain: {
                type: BooleanConstructor;
                default: boolean;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            mark: {
                type: BooleanConstructor;
                default: boolean;
            };
            /***** 组件 *****/
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            reverse: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>>, {
            closable: boolean;
            reverse: boolean;
            type: "default" | "info" | "success" | "warn" | "error" | "primary";
            mark: boolean;
            size: "medium" | "large";
            round: boolean;
            plain: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            type: {
                type: import("vue").PropType<"default" | "info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            size: {
                type: import("vue").PropType<"medium" | "large">;
                default: string;
                validator(value: any): boolean;
            };
            plain: {
                type: BooleanConstructor;
                default: boolean;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            mark: {
                type: BooleanConstructor;
                default: boolean;
            };
            /***** 组件 *****/
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            reverse: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>>, {}, {}, {}, {}, {
            closable: boolean;
            reverse: boolean;
            type: "default" | "info" | "success" | "warn" | "error" | "primary";
            mark: boolean;
            size: "medium" | "large";
            round: boolean;
            plain: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        type: {
            type: import("vue").PropType<"default" | "info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        size: {
            type: import("vue").PropType<"medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        plain: {
            type: BooleanConstructor;
            default: boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        mark: {
            type: BooleanConstructor;
            default: boolean;
        };
        /***** 组件 *****/
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        reverse: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        closable: boolean;
        reverse: boolean;
        type: "default" | "info" | "success" | "warn" | "error" | "primary";
        mark: boolean;
        size: "medium" | "large";
        round: boolean;
        plain: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Input: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            placeholder: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: null;
            };
            labelWidth: {
                type: StringConstructor;
                default: null;
            };
            labelAlign: {
                type: import("vue").PropType<"left" | "right" | "center">;
                default: string;
                validator(value: any): boolean;
            };
            labelOffset: {
                type: StringConstructor;
                default: null;
            };
            type: {
                type: import("vue").PropType<"number" | "textarea" | "text" | "tel" | "password">;
                default: string;
                validator(value: any): boolean;
            };
            name: {
                type: StringConstructor;
                default: null;
            };
            maxlength: {
                type: NumberConstructor;
                default: number;
            };
            size: {
                type: import("vue").PropType<"medium" | "large">;
                default: string;
                validator(value: any): boolean;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            readonly: {
                type: BooleanConstructor;
                default: boolean;
            };
            required: {
                type: BooleanConstructor;
                default: boolean;
            };
            clearable: {
                type: BooleanConstructor;
                default: boolean;
            };
            autofocus: {
                type: BooleanConstructor;
                default: boolean;
            };
            showWordLimit: {
                type: BooleanConstructor;
                default: boolean;
            };
            left: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            right: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            rows: {
                type: NumberConstructor;
                default: number;
            };
            autosize: {
                type: import("vue").PropType<boolean | import("./components/input/prop").InputAutosizeType>;
                default: boolean;
                validator(value: any): boolean;
            };
            align: {
                type: import("vue").PropType<"left" | "right" | "center">;
                default: string;
                validator(value: any): boolean;
            };
            inputMode: {
                type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
                default: string;
                validator(value: any): boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onFocus?: ((...args: any[]) => any) | undefined;
            onBlur?: ((...args: any[]) => any) | undefined;
            onInput?: ((...args: any[]) => any) | undefined;
            onKeydown?: ((...args: any[]) => any) | undefined;
            onKeyup?: ((...args: any[]) => any) | undefined;
            onClear?: ((...args: any[]) => any) | undefined;
            "onLeft-click"?: ((...args: any[]) => any) | undefined;
            "onRight-click"?: ((...args: any[]) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            input: (...args: any[]) => void;
            clear: (...args: any[]) => void;
            focus: (...args: any[]) => void;
            blur: (...args: any[]) => void;
            "left-click": (...args: any[]) => void;
            "right-click": (...args: any[]) => void;
            keydown: (...args: any[]) => void;
            keyup: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            placeholder: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: null;
            };
            labelWidth: {
                type: StringConstructor;
                default: null;
            };
            labelAlign: {
                type: import("vue").PropType<"left" | "right" | "center">;
                default: string;
                validator(value: any): boolean;
            };
            labelOffset: {
                type: StringConstructor;
                default: null;
            };
            type: {
                type: import("vue").PropType<"number" | "textarea" | "text" | "tel" | "password">;
                default: string;
                validator(value: any): boolean;
            };
            name: {
                type: StringConstructor;
                default: null;
            };
            maxlength: {
                type: NumberConstructor;
                default: number;
            };
            size: {
                type: import("vue").PropType<"medium" | "large">;
                default: string;
                validator(value: any): boolean;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            readonly: {
                type: BooleanConstructor;
                default: boolean;
            };
            required: {
                type: BooleanConstructor;
                default: boolean;
            };
            clearable: {
                type: BooleanConstructor;
                default: boolean;
            };
            autofocus: {
                type: BooleanConstructor;
                default: boolean;
            };
            showWordLimit: {
                type: BooleanConstructor;
                default: boolean;
            };
            left: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            right: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            rows: {
                type: NumberConstructor;
                default: number;
            };
            autosize: {
                type: import("vue").PropType<boolean | import("./components/input/prop").InputAutosizeType>;
                default: boolean;
                validator(value: any): boolean;
            };
            align: {
                type: import("vue").PropType<"left" | "right" | "center">;
                default: string;
                validator(value: any): boolean;
            };
            inputMode: {
                type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
                default: string;
                validator(value: any): boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onFocus?: ((...args: any[]) => any) | undefined;
            onBlur?: ((...args: any[]) => any) | undefined;
            onInput?: ((...args: any[]) => any) | undefined;
            onKeydown?: ((...args: any[]) => any) | undefined;
            onKeyup?: ((...args: any[]) => any) | undefined;
            onClear?: ((...args: any[]) => any) | undefined;
            "onLeft-click"?: ((...args: any[]) => any) | undefined;
            "onRight-click"?: ((...args: any[]) => any) | undefined;
        }, {
            modelValue: string | number;
            name: string;
            type: "number" | "textarea" | "text" | "tel" | "password";
            label: string;
            disabled: boolean;
            size: "medium" | "large";
            left: string | import("./components/icon/props").IconPropsType;
            right: string | import("./components/icon/props").IconPropsType;
            border: boolean;
            align: "left" | "right" | "center";
            placeholder: string;
            required: boolean;
            clearable: boolean;
            inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
            maxlength: number;
            readonly: boolean;
            autofocus: boolean;
            rows: number;
            autosize: boolean | import("./components/input/prop").InputAutosizeType;
            labelWidth: string;
            labelOffset: string;
            labelAlign: "left" | "right" | "center";
            showWordLimit: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            placeholder: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: null;
            };
            labelWidth: {
                type: StringConstructor;
                default: null;
            };
            labelAlign: {
                type: import("vue").PropType<"left" | "right" | "center">;
                default: string;
                validator(value: any): boolean;
            };
            labelOffset: {
                type: StringConstructor;
                default: null;
            };
            type: {
                type: import("vue").PropType<"number" | "textarea" | "text" | "tel" | "password">;
                default: string;
                validator(value: any): boolean;
            };
            name: {
                type: StringConstructor;
                default: null;
            };
            maxlength: {
                type: NumberConstructor;
                default: number;
            };
            size: {
                type: import("vue").PropType<"medium" | "large">;
                default: string;
                validator(value: any): boolean;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            readonly: {
                type: BooleanConstructor;
                default: boolean;
            };
            required: {
                type: BooleanConstructor;
                default: boolean;
            };
            clearable: {
                type: BooleanConstructor;
                default: boolean;
            };
            autofocus: {
                type: BooleanConstructor;
                default: boolean;
            };
            showWordLimit: {
                type: BooleanConstructor;
                default: boolean;
            };
            left: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            right: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            rows: {
                type: NumberConstructor;
                default: number;
            };
            autosize: {
                type: import("vue").PropType<boolean | import("./components/input/prop").InputAutosizeType>;
                default: boolean;
                validator(value: any): boolean;
            };
            align: {
                type: import("vue").PropType<"left" | "right" | "center">;
                default: string;
                validator(value: any): boolean;
            };
            inputMode: {
                type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
                default: string;
                validator(value: any): boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onFocus?: ((...args: any[]) => any) | undefined;
            onBlur?: ((...args: any[]) => any) | undefined;
            onInput?: ((...args: any[]) => any) | undefined;
            onKeydown?: ((...args: any[]) => any) | undefined;
            onKeyup?: ((...args: any[]) => any) | undefined;
            onClear?: ((...args: any[]) => any) | undefined;
            "onLeft-click"?: ((...args: any[]) => any) | undefined;
            "onRight-click"?: ((...args: any[]) => any) | undefined;
        }, {}, {}, {}, {}, {
            modelValue: string | number;
            name: string;
            type: "number" | "textarea" | "text" | "tel" | "password";
            label: string;
            disabled: boolean;
            size: "medium" | "large";
            left: string | import("./components/icon/props").IconPropsType;
            right: string | import("./components/icon/props").IconPropsType;
            border: boolean;
            align: "left" | "right" | "center";
            placeholder: string;
            required: boolean;
            clearable: boolean;
            inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
            maxlength: number;
            readonly: boolean;
            autofocus: boolean;
            rows: number;
            autosize: boolean | import("./components/input/prop").InputAutosizeType;
            labelWidth: string;
            labelOffset: string;
            labelAlign: "left" | "right" | "center";
            showWordLimit: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: null;
        };
        labelWidth: {
            type: StringConstructor;
            default: null;
        };
        labelAlign: {
            type: import("vue").PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        labelOffset: {
            type: StringConstructor;
            default: null;
        };
        type: {
            type: import("vue").PropType<"number" | "textarea" | "text" | "tel" | "password">;
            default: string;
            validator(value: any): boolean;
        };
        name: {
            type: StringConstructor;
            default: null;
        };
        maxlength: {
            type: NumberConstructor;
            default: number;
        };
        size: {
            type: import("vue").PropType<"medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        readonly: {
            type: BooleanConstructor;
            default: boolean;
        };
        required: {
            type: BooleanConstructor;
            default: boolean;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        autofocus: {
            type: BooleanConstructor;
            default: boolean;
        };
        showWordLimit: {
            type: BooleanConstructor;
            default: boolean;
        };
        left: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        right: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        rows: {
            type: NumberConstructor;
            default: number;
        };
        autosize: {
            type: import("vue").PropType<boolean | import("./components/input/prop").InputAutosizeType>;
            default: boolean;
            validator(value: any): boolean;
        };
        align: {
            type: import("vue").PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        inputMode: {
            type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
            default: string;
            validator(value: any): boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onFocus?: ((...args: any[]) => any) | undefined;
        onBlur?: ((...args: any[]) => any) | undefined;
        onInput?: ((...args: any[]) => any) | undefined;
        onKeydown?: ((...args: any[]) => any) | undefined;
        onKeyup?: ((...args: any[]) => any) | undefined;
        onClear?: ((...args: any[]) => any) | undefined;
        "onLeft-click"?: ((...args: any[]) => any) | undefined;
        "onRight-click"?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        input: (...args: any[]) => void;
        clear: (...args: any[]) => void;
        focus: (...args: any[]) => void;
        blur: (...args: any[]) => void;
        "left-click": (...args: any[]) => void;
        "right-click": (...args: any[]) => void;
        keydown: (...args: any[]) => void;
        keyup: (...args: any[]) => void;
    }, string, {
        modelValue: string | number;
        name: string;
        type: "number" | "textarea" | "text" | "tel" | "password";
        label: string;
        disabled: boolean;
        size: "medium" | "large";
        left: string | import("./components/icon/props").IconPropsType;
        right: string | import("./components/icon/props").IconPropsType;
        border: boolean;
        align: "left" | "right" | "center";
        placeholder: string;
        required: boolean;
        clearable: boolean;
        inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
        maxlength: number;
        readonly: boolean;
        autofocus: boolean;
        rows: number;
        autosize: boolean | import("./components/input/prop").InputAutosizeType;
        labelWidth: string;
        labelOffset: string;
        labelAlign: "left" | "right" | "center";
        showWordLimit: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            left?(_: {}): any;
            right?(_: {}): any;
        };
    });
    Loading: import("vue").DefineComponent<{
        type: {
            type: import("vue").PropType<"default" | "circle" | "spin" | "dots" | "transfer">;
            default: string;
            validator(value: any): boolean;
        };
        color: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: StringConstructor;
            default: string;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        type: {
            type: import("vue").PropType<"default" | "circle" | "spin" | "dots" | "transfer">;
            default: string;
            validator(value: any): boolean;
        };
        color: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: StringConstructor;
            default: string;
        };
    }>>, {
        color: string;
        type: "default" | "circle" | "spin" | "dots" | "transfer";
        size: string;
    }, {}>;
    LoadingBar: {
        $el?: HTMLElement | undefined;
        $instance?: App<Element> | undefined;
        $vm?: import("vue").ComponentInternalInstance | undefined;
        initParams: (options: string | import("./components/loading-bar/props").LoadingBarPropsType) => import("./components/loading-bar/props").LoadingBarPropsType;
        showLoadingBar: (options: string | import("./components/loading-bar/props").LoadingBarPropsType) => void;
        hideLoadingBar: () => void;
        install: (app: App<any>) => void;
    };
    Msgbox: {
        initParams: (options: string | import("./components/msgbox/props").MsgboxPropsType) => import("./components/msgbox/props").MsgboxPropsType;
        msgbox: (options: string | import("./components/msgbox/props").MsgboxPropsType) => void;
        install: (app: App<any>) => void;
    };
    Divider: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            dashed: {
                type: BooleanConstructor;
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            dashed: {
                type: BooleanConstructor;
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
        }>>, {
            color: string;
            dashed: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            dashed: {
                type: BooleanConstructor;
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
        }>>, {}, {}, {}, {}, {
            color: string;
            dashed: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        dashed: {
            type: BooleanConstructor;
            default: boolean;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        color: string;
        dashed: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Cell: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            icon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            /***** 指令 *****/
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
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            active: {
                type: BooleanConstructor;
                default: null;
            };
            ellipsis: {
                type: (NumberConstructor | BooleanConstructor)[];
                default: null;
            };
            noWrap: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            icon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            /***** 指令 *****/
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
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            active: {
                type: BooleanConstructor;
                default: null;
            };
            ellipsis: {
                type: (NumberConstructor | BooleanConstructor)[];
                default: null;
            };
            noWrap: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>>, {
            label: string;
            title: string;
            icon: string | import("./components/icon/props").IconPropsType;
            active: boolean;
            border: boolean;
            content: string;
            arrow: string | import("./components/icon/props").IconPropsType;
            ellipsis: number | boolean;
            noWrap: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            icon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            /***** 指令 *****/
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
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            active: {
                type: BooleanConstructor;
                default: null;
            };
            ellipsis: {
                type: (NumberConstructor | BooleanConstructor)[];
                default: null;
            };
            noWrap: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>>, {}, {}, {}, {}, {
            label: string;
            title: string;
            icon: string | import("./components/icon/props").IconPropsType;
            active: boolean;
            border: boolean;
            content: string;
            arrow: string | import("./components/icon/props").IconPropsType;
            ellipsis: number | boolean;
            noWrap: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        icon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        /***** 指令 *****/
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
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        active: {
            type: BooleanConstructor;
            default: null;
        };
        ellipsis: {
            type: (NumberConstructor | BooleanConstructor)[];
            default: null;
        };
        noWrap: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        label: string;
        title: string;
        icon: string | import("./components/icon/props").IconPropsType;
        active: boolean;
        border: boolean;
        content: string;
        arrow: string | import("./components/icon/props").IconPropsType;
        ellipsis: number | boolean;
        noWrap: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            title?(_: {}): any;
            content?(_: {}): any;
            label?(_: {}): any;
        };
    });
    CellGroup: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            title: {
                type: StringConstructor;
                default: null;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            active: {
                type: BooleanConstructor;
                /***** 指令 *****/
                default: boolean;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            title: {
                type: StringConstructor;
                default: null;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            active: {
                type: BooleanConstructor;
                /***** 指令 *****/
                default: boolean;
            };
        }>>, {
            title: string;
            active: boolean;
            border: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            title: {
                type: StringConstructor;
                default: null;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            active: {
                type: BooleanConstructor;
                /***** 指令 *****/
                default: boolean;
            };
        }>>, {}, {}, {}, {}, {
            title: string;
            active: boolean;
            border: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: null;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            /***** 指令 *****/
            default: boolean;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        title: string;
        active: boolean;
        border: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Checkbox: import("vue").DefineComponent<{
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: (BooleanConstructor | ArrayConstructor)[];
            default: boolean;
        };
        label: {
            type: StringConstructor;
            default: null;
        };
        value: {
            type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
            default: string;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        name: {
            type: StringConstructor;
            default: null;
        };
        placement: {
            type: import("vue").PropType<"left" | "right">;
            default: string;
            validator(value: any): boolean;
        };
        size: {
            type: StringConstructor;
            default: null;
        }; /***** 组件 *****/
        color: {
            type: StringConstructor;
            default: null;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: (BooleanConstructor | ArrayConstructor)[];
            default: boolean;
        };
        label: {
            type: StringConstructor;
            default: null;
        };
        value: {
            type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
            default: string;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        name: {
            type: StringConstructor;
            default: null;
        };
        placement: {
            type: import("vue").PropType<"left" | "right">;
            default: string;
            validator(value: any): boolean;
        };
        size: {
            type: StringConstructor;
            default: null;
        }; /***** 组件 *****/
        color: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        color: string;
        modelValue: boolean | unknown[];
        name: string;
        label: string;
        disabled: boolean;
        size: string;
        placement: "left" | "right";
        round: boolean;
        value: string | number | Record<string, any> | unknown[];
    }, {}>;
    Radio: import("vue").DefineComponent<{
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: (StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor)[];
            default: boolean;
        }; /***** 指令 *****/
        label: {
            type: StringConstructor;
            default: null;
        };
        value: {
            type: (StringConstructor | NumberConstructor | ObjectConstructor)[];
            default: string;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        name: {
            type: StringConstructor;
            default: null;
        };
        placement: {
            type: import("vue").PropType<"left" | "right">;
            default: string;
            validator(value: any): boolean;
        };
        size: {
            type: StringConstructor;
            default: null;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: (StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor)[];
            default: boolean;
        }; /***** 指令 *****/
        label: {
            type: StringConstructor;
            default: null;
        };
        value: {
            type: (StringConstructor | NumberConstructor | ObjectConstructor)[];
            default: string;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        name: {
            type: StringConstructor;
            default: null;
        };
        placement: {
            type: import("vue").PropType<"left" | "right">;
            default: string;
            validator(value: any): boolean;
        };
        size: {
            type: StringConstructor;
            default: null;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        color: string;
        modelValue: string | number | boolean | Record<string, any>;
        name: string;
        label: string;
        disabled: boolean;
        size: string;
        placement: "left" | "right";
        round: boolean;
        value: string | number | Record<string, any>;
    }, {}>;
    Sign: import("vue").DefineComponent<{
        color: {
            type: StringConstructor;
            default: string;
        };
        background: {
            type: StringConstructor;
            default: string;
        };
        width: {
            type: NumberConstructor; /***** 指令 *****/
            default: number;
        };
    }, {
        getImage: () => string;
        clear: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        color: {
            type: StringConstructor;
            default: string;
        };
        background: {
            type: StringConstructor;
            default: string;
        };
        width: {
            type: NumberConstructor; /***** 指令 *****/
            default: number;
        };
    }>>, {
        color: string;
        width: number;
        background: string;
    }, {}>;
    Roll: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            interval: {
                type: NumberConstructor;
                default: number;
            };
            direction: {
                type: import("vue").PropType<"left" | "right" | "up" | "down">;
                default: string;
                validator(value: any): boolean;
            };
            autoplay: {
                type: BooleanConstructor;
                default: boolean;
            };
            loop: {
                type: BooleanConstructor;
                default: boolean;
            };
            animation: {
                type: import("vue").PropType<"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out">;
                default: string;
                validator(value: any): boolean;
            };
            clickStop: {
                type: BooleanConstructor;
                default: boolean;
            };
            hoverStop: {
                type: BooleanConstructor;
                default: boolean;
            };
            center: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            onPause?: ((...args: any[]) => any) | undefined;
            onPlay?: ((...args: any[]) => any) | undefined;
            onStop?: ((...args: any[]) => any) | undefined;
        }, {
            pause: () => void;
            stop: () => void;
            play: () => void;
            isStopped: import("vue").ComputedRef<boolean>;
            isPaused: import("vue").ComputedRef<boolean>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            stop: (...args: any[]) => void;
            pause: (...args: any[]) => void;
            play: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            interval: {
                type: NumberConstructor;
                default: number;
            };
            direction: {
                type: import("vue").PropType<"left" | "right" | "up" | "down">;
                default: string;
                validator(value: any): boolean;
            };
            autoplay: {
                type: BooleanConstructor;
                default: boolean;
            };
            loop: {
                type: BooleanConstructor;
                default: boolean;
            };
            animation: {
                type: import("vue").PropType<"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out">;
                default: string;
                validator(value: any): boolean;
            };
            clickStop: {
                type: BooleanConstructor;
                default: boolean;
            };
            hoverStop: {
                type: BooleanConstructor;
                default: boolean;
            };
            center: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            onPause?: ((...args: any[]) => any) | undefined;
            onPlay?: ((...args: any[]) => any) | undefined;
            onStop?: ((...args: any[]) => any) | undefined;
        }, {
            animation: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
            center: boolean;
            autoplay: boolean;
            loop: boolean;
            interval: number;
            direction: "left" | "right" | "up" | "down";
            clickStop: boolean;
            hoverStop: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            interval: {
                type: NumberConstructor;
                default: number;
            };
            direction: {
                type: import("vue").PropType<"left" | "right" | "up" | "down">;
                default: string;
                validator(value: any): boolean;
            };
            autoplay: {
                type: BooleanConstructor;
                default: boolean;
            };
            loop: {
                type: BooleanConstructor;
                default: boolean;
            };
            animation: {
                type: import("vue").PropType<"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out">;
                default: string;
                validator(value: any): boolean;
            };
            clickStop: {
                type: BooleanConstructor;
                default: boolean;
            };
            hoverStop: {
                type: BooleanConstructor;
                default: boolean;
            };
            center: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            onPause?: ((...args: any[]) => any) | undefined;
            onPlay?: ((...args: any[]) => any) | undefined;
            onStop?: ((...args: any[]) => any) | undefined;
        }, {
            pause: () => void;
            stop: () => void;
            play: () => void;
            isStopped: import("vue").ComputedRef<boolean>;
            isPaused: import("vue").ComputedRef<boolean>;
        }, {}, {}, {}, {
            animation: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
            center: boolean;
            autoplay: boolean;
            loop: boolean;
            interval: number;
            direction: "left" | "right" | "up" | "down";
            clickStop: boolean;
            hoverStop: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        interval: {
            type: NumberConstructor;
            default: number;
        };
        direction: {
            type: import("vue").PropType<"left" | "right" | "up" | "down">;
            default: string;
            validator(value: any): boolean;
        };
        autoplay: {
            type: BooleanConstructor;
            default: boolean;
        };
        loop: {
            type: BooleanConstructor;
            default: boolean;
        };
        animation: {
            type: import("vue").PropType<"linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out">;
            default: string;
            validator(value: any): boolean;
        };
        clickStop: {
            type: BooleanConstructor;
            default: boolean;
        };
        hoverStop: {
            type: BooleanConstructor;
            default: boolean;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onPause?: ((...args: any[]) => any) | undefined;
        onPlay?: ((...args: any[]) => any) | undefined;
        onStop?: ((...args: any[]) => any) | undefined;
    }, {
        pause: () => void;
        stop: () => void;
        play: () => void;
        isStopped: import("vue").ComputedRef<boolean>;
        isPaused: import("vue").ComputedRef<boolean>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        stop: (...args: any[]) => void;
        pause: (...args: any[]) => void;
        play: (...args: any[]) => void;
    }, string, {
        animation: "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";
        center: boolean;
        autoplay: boolean;
        loop: boolean;
        interval: number;
        direction: "left" | "right" | "up" | "down";
        clickStop: boolean;
        hoverStop: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Row: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            justify: {
                type: import("vue").PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
                default: string;
                validator(value: any): boolean;
            };
            align: {
                type: import("vue").PropType<"center" | "flex-start" | "flex-end">;
                default: string;
                validator(value: any): boolean;
            };
            tag: {
                type: StringConstructor;
                default: string;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            justify: {
                type: import("vue").PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
                default: string;
                validator(value: any): boolean;
            };
            align: {
                type: import("vue").PropType<"center" | "flex-start" | "flex-end">;
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
        }, Readonly<import("vue").ExtractPropTypes<{
            justify: {
                type: import("vue").PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
                default: string;
                validator(value: any): boolean;
            };
            align: {
                type: import("vue").PropType<"center" | "flex-start" | "flex-end">;
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
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        justify: {
            type: import("vue").PropType<"flex-start" | "flex-end" | "space-around" | "space-between">;
            default: string;
            validator(value: any): boolean;
        };
        align: {
            type: import("vue").PropType<"center" | "flex-start" | "flex-end">;
            default: string;
            validator(value: any): boolean;
        };
        tag: {
            type: StringConstructor;
            default: string;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        align: "center" | "flex-start" | "flex-end";
        tag: string;
        justify: "flex-start" | "flex-end" | "space-around" | "space-between";
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Col: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            span: {
                type: NumberConstructor;
                default: number;
            };
            offset: {
                /***** 指令 *****/
                type: NumberConstructor;
                default: number;
            };
            tag: {
                type: StringConstructor;
                default: string;
            };
            xs: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            sm: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            md: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            lg: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            xl: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            span: {
                type: NumberConstructor;
                default: number;
            };
            offset: {
                /***** 指令 *****/
                type: NumberConstructor;
                default: number;
            };
            tag: {
                type: StringConstructor;
                default: string;
            };
            xs: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            sm: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            md: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            lg: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            xl: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
        }>>, {
            span: number;
            offset: number;
            tag: string;
            xs: number | import("./components/col/props").ColResponsiveType;
            sm: number | import("./components/col/props").ColResponsiveType;
            md: number | import("./components/col/props").ColResponsiveType;
            lg: number | import("./components/col/props").ColResponsiveType;
            xl: number | import("./components/col/props").ColResponsiveType;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            span: {
                type: NumberConstructor;
                default: number;
            };
            offset: {
                /***** 指令 *****/
                type: NumberConstructor;
                default: number;
            };
            tag: {
                type: StringConstructor;
                default: string;
            };
            xs: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            sm: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            md: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            lg: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
            xl: {
                type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
                default: null;
            };
        }>>, {}, {}, {}, {}, {
            span: number;
            offset: number;
            tag: string;
            xs: number | import("./components/col/props").ColResponsiveType;
            sm: number | import("./components/col/props").ColResponsiveType;
            md: number | import("./components/col/props").ColResponsiveType;
            lg: number | import("./components/col/props").ColResponsiveType;
            xl: number | import("./components/col/props").ColResponsiveType;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        span: {
            type: NumberConstructor;
            default: number;
        };
        offset: {
            /***** 指令 *****/
            type: NumberConstructor;
            default: number;
        };
        tag: {
            type: StringConstructor;
            default: string;
        };
        xs: {
            type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
            default: null;
        };
        sm: {
            type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
            default: null;
        };
        md: {
            type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
            default: null;
        };
        lg: {
            type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
            default: null;
        };
        xl: {
            type: import("vue").PropType<number | import("./components/col/props").ColResponsiveType>;
            default: null;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        span: number;
        offset: number;
        tag: string;
        xs: number | import("./components/col/props").ColResponsiveType;
        sm: number | import("./components/col/props").ColResponsiveType;
        md: number | import("./components/col/props").ColResponsiveType;
        lg: number | import("./components/col/props").ColResponsiveType;
        xl: number | import("./components/col/props").ColResponsiveType;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Autocomplete: import("vue").DefineComponent<{
        modelValue: {
            type: StringConstructor;
            default: string;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: import("vue").PropType<"small" | "medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        list: {
            type: import("vue").PropType<string[]>;
            default: () => never[];
        };
        activeType: {
            type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
            validator(value: any): boolean;
        };
        filterMethod: {
            type: import("vue").PropType<boolean | ((value: string, list: string[]) => string[])>;
            default: boolean;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        layerProps: {
            type: import("vue").PropType<import("./components/layer/props").LayerPropsType>;
            default: () => {};
        };
        height: {
            type: StringConstructor;
            default: null;
        };
        name: {
            type: StringConstructor;
            default: null;
        };
        leftIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        rightIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
        align: {
            type: import("vue").PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        input: (...args: any[]) => void;
        select: (...args: any[]) => void;
        clear: (...args: any[]) => void;
        focus: (...args: any[]) => void;
        blur: (...args: any[]) => void;
        "left-click": (...args: any[]) => void;
        "right-click": (...args: any[]) => void;
        keydown: (...args: any[]) => void;
        keyup: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: StringConstructor;
            default: string;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: import("vue").PropType<"small" | "medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        list: {
            type: import("vue").PropType<string[]>;
            default: () => never[];
        };
        activeType: {
            type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
            validator(value: any): boolean;
        };
        filterMethod: {
            type: import("vue").PropType<boolean | ((value: string, list: string[]) => string[])>;
            default: boolean;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        layerProps: {
            type: import("vue").PropType<import("./components/layer/props").LayerPropsType>;
            default: () => {};
        };
        height: {
            type: StringConstructor;
            default: null;
        };
        name: {
            type: StringConstructor;
            default: null;
        };
        leftIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        rightIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
        align: {
            type: import("vue").PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onFocus?: ((...args: any[]) => any) | undefined;
        onBlur?: ((...args: any[]) => any) | undefined;
        onInput?: ((...args: any[]) => any) | undefined;
        onKeydown?: ((...args: any[]) => any) | undefined;
        onKeyup?: ((...args: any[]) => any) | undefined;
        onSelect?: ((...args: any[]) => any) | undefined;
        onClear?: ((...args: any[]) => any) | undefined;
        "onLeft-click"?: ((...args: any[]) => any) | undefined;
        "onRight-click"?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: string;
        name: string;
        disabled: boolean;
        size: "small" | "medium" | "large";
        round: boolean;
        height: string;
        align: "left" | "right" | "center";
        list: string[];
        placeholder: string;
        activeType: "info" | "success" | "warn" | "error" | "primary";
        activeColor: string;
        filterMethod: boolean | ((value: string, list: string[]) => string[]);
        clearable: boolean;
        layerProps: {
            zIndex?: number | undefined;
            modelValue?: boolean | undefined;
            timeout?: number | undefined;
            closable?: boolean | undefined;
            placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
            width?: string | undefined;
            offset?: string | undefined;
            background?: string | undefined;
            borderColor?: string | undefined;
            relate?: string | undefined;
            showTriangle?: boolean | undefined;
            animation?: string | undefined;
            shadow?: boolean | undefined;
            border?: boolean | undefined;
        };
        leftIcon: string | import("./components/icon/props").IconPropsType;
        rightIcon: string | import("./components/icon/props").IconPropsType;
        square: boolean;
    }, {}>;
    Overlay: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            fade: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
                validator(value: any): boolean;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            show: (...args: any[]) => void;
            showing: (...args: any[]) => void;
            shown: (...args: any[]) => void;
            hide: (...args: any[]) => void;
            hidding: (...args: any[]) => void;
            hidden: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            fade: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
                validator(value: any): boolean;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            mountEl: string;
            zIndex: number;
            color: string;
            modelValue: boolean;
            fade: boolean;
            timeout: number;
            closable: boolean;
            usePadding: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            fade: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
                validator(value: any): boolean;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
        }, {}, {}, {}, {
            mountEl: string;
            zIndex: number;
            color: string;
            modelValue: boolean;
            fade: boolean;
            timeout: number;
            closable: boolean;
            usePadding: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        fade: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
            validator(value: any): boolean;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onShowing?: ((...args: any[]) => any) | undefined;
        onShown?: ((...args: any[]) => any) | undefined;
        onHide?: ((...args: any[]) => any) | undefined;
        onHidding?: ((...args: any[]) => any) | undefined;
        onHidden?: ((...args: any[]) => any) | undefined;
    }, {
        $$el: import("vue").ComputedRef<HTMLElement | null>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        show: (...args: any[]) => void;
        showing: (...args: any[]) => void;
        shown: (...args: any[]) => void;
        hide: (...args: any[]) => void;
        hidding: (...args: any[]) => void;
        hidden: (...args: any[]) => void;
    }, string, {
        mountEl: string;
        zIndex: number;
        color: string;
        modelValue: boolean;
        fade: boolean;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Popup: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                /***** 全局默认样式 *****/
                default: boolean;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            overlayColor: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            placement: {
                type: import("vue").PropType<"left" | "top" | "bottom" | "right">;
                default: string;
                validator(value: any): boolean;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            showTimes: {
                type: BooleanConstructor;
                default: boolean;
            };
            timesPlacement: {
                type: import("vue").PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
                default: string;
                validator(value: any): boolean;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            __contentPadding: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            show: (...args: any[]) => void;
            showing: (...args: any[]) => void;
            shown: (...args: any[]) => void;
            hide: (...args: any[]) => void;
            hidding: (...args: any[]) => void;
            hidden: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                /***** 全局默认样式 *****/
                default: boolean;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            overlayColor: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            placement: {
                type: import("vue").PropType<"left" | "top" | "bottom" | "right">;
                default: string;
                validator(value: any): boolean;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            showTimes: {
                type: BooleanConstructor;
                default: boolean;
            };
            timesPlacement: {
                type: import("vue").PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
                default: string;
                validator(value: any): boolean;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            __contentPadding: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            mountEl: string;
            zIndex: number;
            modelValue: boolean;
            timeout: number;
            closable: boolean;
            usePadding: boolean;
            overlayColor: string;
            placement: "left" | "top" | "bottom" | "right";
            round: boolean;
            width: string;
            showTimes: boolean;
            timesPlacement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
            __contentPadding: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                /***** 全局默认样式 *****/
                default: boolean;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            overlayColor: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            placement: {
                type: import("vue").PropType<"left" | "top" | "bottom" | "right">;
                default: string;
                validator(value: any): boolean;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            showTimes: {
                type: BooleanConstructor;
                default: boolean;
            };
            timesPlacement: {
                type: import("vue").PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
                default: string;
                validator(value: any): boolean;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            __contentPadding: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
        }, {}, {}, {}, {
            mountEl: string;
            zIndex: number;
            modelValue: boolean;
            timeout: number;
            closable: boolean;
            usePadding: boolean;
            overlayColor: string;
            placement: "left" | "top" | "bottom" | "right";
            round: boolean;
            width: string;
            showTimes: boolean;
            timesPlacement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
            __contentPadding: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            /***** 全局默认样式 *****/
            default: boolean;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        overlayColor: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        placement: {
            type: import("vue").PropType<"left" | "top" | "bottom" | "right">;
            default: string;
            validator(value: any): boolean;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        showTimes: {
            type: BooleanConstructor;
            default: boolean;
        };
        timesPlacement: {
            type: import("vue").PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
            default: string;
            validator(value: any): boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        __contentPadding: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onShowing?: ((...args: any[]) => any) | undefined;
        onShown?: ((...args: any[]) => any) | undefined;
        onHide?: ((...args: any[]) => any) | undefined;
        onHidding?: ((...args: any[]) => any) | undefined;
        onHidden?: ((...args: any[]) => any) | undefined;
    }, {
        $$el: import("vue").ComputedRef<HTMLElement | null>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        show: (...args: any[]) => void;
        showing: (...args: any[]) => void;
        shown: (...args: any[]) => void;
        hide: (...args: any[]) => void;
        hidding: (...args: any[]) => void;
        hidden: (...args: any[]) => void;
    }, string, {
        mountEl: string;
        zIndex: number;
        modelValue: boolean;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        overlayColor: string;
        placement: "left" | "top" | "bottom" | "right";
        round: boolean;
        width: string;
        showTimes: boolean;
        timesPlacement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
        __contentPadding: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Dropdown: import("vue").DefineComponent<{
        modelValue: {
            type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
            default: null;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
        };
        options: {
            type: import("vue").PropType<import("./components/dropdown/props").DropdownOptionsItemType[]>;
            default: () => never[];
        };
        selectedClose: {
            type: BooleanConstructor;
            default: boolean;
        };
        selectedIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        show: {
            type: BooleanConstructor;
            default: boolean;
        };
        overlayColor: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        placement: {
            type: import("vue").PropType<"left" | "top" | "bottom" | "right" | undefined>;
            default: string;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
    }, {
        $$el: import("vue").ComputedRef<HTMLElement | null>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        show: (...args: any[]) => void;
        showing: (...args: any[]) => void;
        shown: (...args: any[]) => void;
        hide: (...args: any[]) => void;
        hidding: (...args: any[]) => void;
        hidden: (...args: any[]) => void;
        select: (...args: any[]) => void;
        "update:show": (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
            default: null;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
        };
        options: {
            type: import("vue").PropType<import("./components/dropdown/props").DropdownOptionsItemType[]>;
            default: () => never[];
        };
        selectedClose: {
            type: BooleanConstructor;
            default: boolean;
        };
        selectedIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        show: {
            type: BooleanConstructor;
            default: boolean;
        };
        overlayColor: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        placement: {
            type: import("vue").PropType<"left" | "top" | "bottom" | "right" | undefined>;
            default: string;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onShowing?: ((...args: any[]) => any) | undefined;
        onShown?: ((...args: any[]) => any) | undefined;
        onHide?: ((...args: any[]) => any) | undefined;
        onHidding?: ((...args: any[]) => any) | undefined;
        onHidden?: ((...args: any[]) => any) | undefined;
        onSelect?: ((...args: any[]) => any) | undefined;
        "onUpdate:show"?: ((...args: any[]) => any) | undefined;
    }, {
        mountEl: string;
        zIndex: number;
        modelValue: string | number | Record<string, any> | unknown[];
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        show: boolean;
        overlayColor: string;
        placement: "left" | "top" | "bottom" | "right" | undefined;
        round: boolean;
        options: import("./components/dropdown/props").DropdownOptionsItemType[];
        active: boolean;
        activeColor: string;
        selectedClose: boolean;
        selectedIcon: string | import("./components/icon/props").IconPropsType;
    }, {}>;
    Tooltip: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            title: {
                type: StringConstructor;
                default: string;
            };
            placement: {
                type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined>;
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
                default: string;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
            textColor: {
                type: StringConstructor;
                default: string;
            };
            trigger: {
                type: import("vue").PropType<"click" | "hover" | "custom">;
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
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            title: {
                type: StringConstructor;
                default: string;
            };
            placement: {
                type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined>;
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
                default: string;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
            textColor: {
                type: StringConstructor;
                default: string;
            };
            trigger: {
                type: import("vue").PropType<"click" | "hover" | "custom">;
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
            zIndex: number;
            color: string;
            timeout: number;
            title: string;
            disabled: boolean;
            placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
            width: string;
            offset: string;
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
        }, Readonly<import("vue").ExtractPropTypes<{
            title: {
                type: StringConstructor;
                default: string;
            };
            placement: {
                type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined>;
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
                default: string;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
            textColor: {
                type: StringConstructor;
                default: string;
            };
            trigger: {
                type: import("vue").PropType<"click" | "hover" | "custom">;
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
            zIndex: number;
            color: string;
            timeout: number;
            title: string;
            disabled: boolean;
            placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
            width: string;
            offset: string;
            borderColor: string;
            showTriangle: boolean;
            animation: string;
            block: boolean;
            trigger: "click" | "hover" | "custom";
            textColor: string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        placement: {
            type: import("vue").PropType<"left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined>;
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
            default: string;
        };
        color: {
            type: StringConstructor;
            default: string;
        };
        textColor: {
            type: StringConstructor;
            default: string;
        };
        trigger: {
            type: import("vue").PropType<"click" | "hover" | "custom">;
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
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        zIndex: number;
        color: string;
        timeout: number;
        title: string;
        disabled: boolean;
        placement: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
        width: string;
        offset: string;
        borderColor: string;
        showTriangle: boolean;
        animation: string;
        block: boolean;
        trigger: "click" | "hover" | "custom";
        textColor: string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
            title?(_: {}): any;
        };
    });
    TransitionSlide: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            expand: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
            "onSlide-down"?: ((...args: any[]) => any) | undefined;
            "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
            "onSlide-up"?: ((...args: any[]) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "before-slide-down": (...args: any[]) => void;
            "slide-down": (...args: any[]) => void;
            "before-slide-up": (...args: any[]) => void;
            "slide-up": (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            expand: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
            "onSlide-down"?: ((...args: any[]) => any) | undefined;
            "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
            "onSlide-up"?: ((...args: any[]) => any) | undefined;
        }, {
            timeout: number;
            expand: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            expand: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
            "onSlide-down"?: ((...args: any[]) => any) | undefined;
            "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
            "onSlide-up"?: ((...args: any[]) => any) | undefined;
        }, {}, {}, {}, {}, {
            timeout: number;
            expand: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        expand: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
        "onSlide-down"?: ((...args: any[]) => any) | undefined;
        "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
        "onSlide-up"?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "before-slide-down": (...args: any[]) => void;
        "slide-down": (...args: any[]) => void;
        "before-slide-up": (...args: any[]) => void;
        "slide-up": (...args: any[]) => void;
    }, string, {
        timeout: number;
        expand: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Switch: import("vue").DefineComponent<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        loading: {
            type: BooleanConstructor;
            /***** 辅助样式 *****/
            default: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        size: {
            type: StringConstructor;
            default: string;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
        };
        inactiveColor: {
            type: StringConstructor;
            default: null;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        loading: {
            type: BooleanConstructor;
            /***** 辅助样式 *****/
            default: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        size: {
            type: StringConstructor;
            default: string;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
        };
        inactiveColor: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: boolean;
        disabled: boolean;
        size: string;
        loading: boolean;
        activeColor: string;
        inactiveColor: string;
    }, {}>;
    Navbar: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            rightIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
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
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "left-click": (...args: any[]) => void;
            "right-click": (...args: any[]) => void;
            "title-click": (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            rightIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
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
            zIndex: number;
            fixed: boolean;
            title: string;
            border: boolean;
            leftIcon: string | import("./components/icon/props").IconPropsType;
            rightIcon: string | import("./components/icon/props").IconPropsType;
            leftText: string;
            rightText: string;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
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
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            rightIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
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
            zIndex: number;
            fixed: boolean;
            title: string;
            border: boolean;
            leftIcon: string | import("./components/icon/props").IconPropsType;
            rightIcon: string | import("./components/icon/props").IconPropsType;
            leftText: string;
            rightText: string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        rightIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
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
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "left-click": (...args: any[]) => void;
        "right-click": (...args: any[]) => void;
        "title-click": (...args: any[]) => void;
    }, string, {
        zIndex: number;
        fixed: boolean;
        title: string;
        border: boolean;
        leftIcon: string | import("./components/icon/props").IconPropsType;
        rightIcon: string | import("./components/icon/props").IconPropsType;
        leftText: string;
        rightText: string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            left?(_: {}): any;
            title?(_: {}): any;
            right?(_: {}): any;
        };
    });
    Notify: {
        $el?: HTMLElement | undefined;
        $instance?: App<Element> | undefined;
        $vm?: import("vue").ComponentInternalInstance | undefined;
        initParams: (options: string | import("./components/notify/props").NotifyPropsType) => import("./components/notify/props").NotifyPropsType;
        showNotify: (options: import("./components/notify/props").NotifyPropsType) => void;
        hideNotify: () => void;
        install: (app: App<any>) => void;
    };
    Actionsheet: import("vue").DefineComponent<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        overlayColor: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        options: {
            type: import("vue").PropType<import("./components/actionsheet/props").ActionsheetOptionsItemType[]>;
            default: () => never[];
        };
        showCancel: {
            type: BooleanConstructor;
            default: boolean;
        };
        cancelText: {
            type: StringConstructor;
            default: string;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        selectClose: {
            type: BooleanConstructor;
            default: boolean;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        size: {
            type: import("vue").PropType<"medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
    }, {
        $$el: import("vue").ComputedRef<HTMLElement | null>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        select: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        overlayColor: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        options: {
            type: import("vue").PropType<import("./components/actionsheet/props").ActionsheetOptionsItemType[]>;
            default: () => never[];
        };
        showCancel: {
            type: BooleanConstructor;
            default: boolean;
        };
        cancelText: {
            type: StringConstructor;
            default: string;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        selectClose: {
            type: BooleanConstructor;
            default: boolean;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        size: {
            type: import("vue").PropType<"medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onSelect?: ((...args: any[]) => any) | undefined;
    }, {
        mountEl: string;
        zIndex: number;
        modelValue: boolean;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        title: string;
        size: "medium" | "large";
        overlayColor: string;
        round: boolean;
        options: import("./components/actionsheet/props").ActionsheetOptionsItemType[];
        showCancel: boolean;
        cancelText: string;
        active: boolean;
        selectClose: boolean;
    }, {}>;
    Calendar: import("vue").DefineComponent<{
        modelValue: {
            type: DateConstructor;
            default: () => Date;
        };
        view: {
            type: import("vue").PropType<import("./components/calendar/props").CalendarViewType>;
            default: string;
            validator(value: any): boolean;
        };
        monthText: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
            validator(value: any): any;
        };
        weekText: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
            validator(value: any): any;
        };
        startDate: {
            type: DateConstructor;
            default: () => Date;
        };
        endDate: {
            type: DateConstructor;
            default: () => Date;
        };
        nonCurrentClick: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        type: {
            type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        "date-click": (...args: any[]) => void;
        "month-click": (...args: any[]) => void;
        "year-click": (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: DateConstructor;
            default: () => Date;
        };
        view: {
            type: import("vue").PropType<import("./components/calendar/props").CalendarViewType>;
            default: string;
            validator(value: any): boolean;
        };
        monthText: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
            validator(value: any): any;
        };
        weekText: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
            validator(value: any): any;
        };
        startDate: {
            type: DateConstructor;
            default: () => Date;
        };
        endDate: {
            type: DateConstructor;
            default: () => Date;
        };
        nonCurrentClick: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        type: {
            type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        "onDate-click"?: ((...args: any[]) => any) | undefined;
        "onMonth-click"?: ((...args: any[]) => any) | undefined;
        "onYear-click"?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: Date;
        type: "info" | "success" | "warn" | "error" | "primary";
        view: import("./components/calendar/props").CalendarViewType;
        active: boolean;
        monthText: string[];
        weekText: string[];
        startDate: Date;
        endDate: Date;
        nonCurrentClick: boolean;
    }, {}>;
    CircleProgress: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            value: {
                type: NumberConstructor;
                default: number;
            };
            min: {
                type: NumberConstructor;
                default: number;
            };
            max: {
                type: NumberConstructor;
                default: number;
            };
            size: {
                type: NumberConstructor;
                default: number;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            trackColor: {
                type: StringConstructor;
                default: null;
            };
            fill: {
                type: StringConstructor;
                default: null;
            };
            animation: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            showTip: {
                type: BooleanConstructor;
                default: boolean;
            };
            tipText: {
                type: StringConstructor;
                default: null;
            };
            strokeWidth: {
                type: NumberConstructor;
                default: number;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            clockWise: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            value: {
                type: NumberConstructor;
                default: number;
            };
            min: {
                type: NumberConstructor;
                default: number;
            };
            max: {
                type: NumberConstructor;
                default: number;
            };
            size: {
                type: NumberConstructor;
                default: number;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            trackColor: {
                type: StringConstructor;
                default: null;
            };
            fill: {
                type: StringConstructor;
                default: null;
            };
            animation: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            showTip: {
                type: BooleanConstructor;
                default: boolean;
            };
            tipText: {
                type: StringConstructor;
                default: null;
            };
            strokeWidth: {
                type: NumberConstructor;
                default: number;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            clockWise: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>>, {
            color: string;
            timeout: number;
            fill: string;
            size: number;
            round: boolean;
            animation: boolean;
            max: number;
            min: number;
            value: number;
            trackColor: string;
            showTip: boolean;
            tipText: string;
            strokeWidth: number;
            clockWise: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            value: {
                type: NumberConstructor;
                default: number;
            };
            min: {
                type: NumberConstructor;
                default: number;
            };
            max: {
                type: NumberConstructor;
                default: number;
            };
            size: {
                type: NumberConstructor;
                default: number;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            trackColor: {
                type: StringConstructor;
                default: null;
            };
            fill: {
                type: StringConstructor;
                default: null;
            };
            animation: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            showTip: {
                type: BooleanConstructor;
                default: boolean;
            };
            tipText: {
                type: StringConstructor;
                default: null;
            };
            strokeWidth: {
                type: NumberConstructor;
                default: number;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            clockWise: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>>, {}, {}, {}, {}, {
            color: string;
            timeout: number;
            fill: string;
            size: number;
            round: boolean;
            animation: boolean;
            max: number;
            min: number;
            value: number;
            trackColor: string;
            showTip: boolean;
            tipText: string;
            strokeWidth: number;
            clockWise: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        value: {
            type: NumberConstructor;
            default: number;
        };
        min: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
            default: number;
        };
        size: {
            type: NumberConstructor;
            default: number;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        trackColor: {
            type: StringConstructor;
            default: null;
        };
        fill: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        showTip: {
            type: BooleanConstructor;
            default: boolean;
        };
        tipText: {
            type: StringConstructor;
            default: null;
        };
        strokeWidth: {
            type: NumberConstructor;
            default: number;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        clockWise: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        color: string;
        timeout: number;
        fill: string;
        size: number;
        round: boolean;
        animation: boolean;
        max: number;
        min: number;
        value: number;
        trackColor: string;
        showTip: boolean;
        tipText: string;
        strokeWidth: number;
        clockWise: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            tip?(_: {
                value: number;
            }): any;
        };
    });
    Collapse: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: (NumberConstructor | ArrayConstructor)[];
                default: null;
            };
            accordion: {
                type: BooleanConstructor;
                default: boolean;
            };
            inBorder: {
                type: BooleanConstructor;
                default: boolean;
            };
            outBorder: {
                type: BooleanConstructor;
                default: boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            active: {
                type: BooleanConstructor;
                default: boolean;
            };
            noWrap: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
            "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
            "onSlide-down"?: ((...args: any[]) => any) | undefined;
            "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
            "onSlide-up"?: ((...args: any[]) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            change: (...args: any[]) => void;
            "before-slide-down": (...args: any[]) => void;
            "slide-down": (...args: any[]) => void;
            "before-slide-up": (...args: any[]) => void;
            "slide-up": (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: (NumberConstructor | ArrayConstructor)[];
                default: null;
            };
            accordion: {
                type: BooleanConstructor;
                default: boolean;
            };
            inBorder: {
                type: BooleanConstructor;
                default: boolean;
            };
            outBorder: {
                type: BooleanConstructor;
                default: boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            active: {
                type: BooleanConstructor;
                default: boolean;
            };
            noWrap: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
            "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
            "onSlide-down"?: ((...args: any[]) => any) | undefined;
            "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
            "onSlide-up"?: ((...args: any[]) => any) | undefined;
        }, {
            modelValue: number | unknown[];
            disabled: boolean;
            active: boolean;
            noWrap: boolean;
            accordion: boolean;
            inBorder: boolean;
            outBorder: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: (NumberConstructor | ArrayConstructor)[];
                default: null;
            };
            accordion: {
                type: BooleanConstructor;
                default: boolean;
            };
            inBorder: {
                type: BooleanConstructor;
                default: boolean;
            };
            outBorder: {
                type: BooleanConstructor;
                default: boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            active: {
                type: BooleanConstructor;
                default: boolean;
            };
            noWrap: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
            "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
            "onSlide-down"?: ((...args: any[]) => any) | undefined;
            "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
            "onSlide-up"?: ((...args: any[]) => any) | undefined;
        }, {}, {}, {}, {}, {
            modelValue: number | unknown[];
            disabled: boolean;
            active: boolean;
            noWrap: boolean;
            accordion: boolean;
            inBorder: boolean;
            outBorder: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: (NumberConstructor | ArrayConstructor)[];
            default: null;
        };
        accordion: {
            type: BooleanConstructor;
            default: boolean;
        };
        inBorder: {
            type: BooleanConstructor;
            default: boolean;
        };
        outBorder: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        noWrap: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
        "onBefore-slide-down"?: ((...args: any[]) => any) | undefined;
        "onSlide-down"?: ((...args: any[]) => any) | undefined;
        "onBefore-slide-up"?: ((...args: any[]) => any) | undefined;
        "onSlide-up"?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
        "before-slide-down": (...args: any[]) => void;
        "slide-down": (...args: any[]) => void;
        "before-slide-up": (...args: any[]) => void;
        "slide-up": (...args: any[]) => void;
    }, string, {
        modelValue: number | unknown[];
        disabled: boolean;
        active: boolean;
        noWrap: boolean;
        accordion: boolean;
        inBorder: boolean;
        outBorder: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    CollapseItem: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            icon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
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
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            icon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
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
            disabled: boolean;
            icon: string | import("./components/icon/props").IconPropsType;
            content: string;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            icon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
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
            disabled: boolean;
            icon: string | import("./components/icon/props").IconPropsType;
            content: string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        icon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
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
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        label: string;
        title: string;
        disabled: boolean;
        icon: string | import("./components/icon/props").IconPropsType;
        content: string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    DateChooser: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: DateConstructor;
                default: () => Date;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            layerProps: {
                type: import("vue").PropType<import("./components/layer/props").LayerPropsType>;
                default: () => {};
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            trigger: {
                type: import("vue").PropType<"click" | "hover" | "custom">;
                default: string;
                validator(value: any): boolean;
            };
            mode: {
                type: import("vue").PropType<import("./components/calendar/props").CalendarViewType>;
                default: string;
                validator(value: any): boolean;
            };
            monthText: {
                type: import("vue").PropType<string[]>;
                default: () => string[];
            };
            weekText: {
                type: import("vue").PropType<string[]>;
                default: () => string[];
            };
            startDate: {
                type: DateConstructor;
                default: () => Date;
            };
            endDate: {
                type: DateConstructor;
                default: () => Date;
            };
            active: {
                type: BooleanConstructor;
                default: boolean;
            };
            type: {
                type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            block: {
                type: BooleanConstructor;
                default: boolean;
            };
            headerFormatter: {
                type: import("vue").PropType<(type: import("./components/calendar/props").CalendarViewType, val: number) => string>;
                default: null;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            openCalendar: () => void;
            closeCalendar: () => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            change: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: DateConstructor;
                default: () => Date;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            layerProps: {
                type: import("vue").PropType<import("./components/layer/props").LayerPropsType>;
                default: () => {};
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            trigger: {
                type: import("vue").PropType<"click" | "hover" | "custom">;
                default: string;
                validator(value: any): boolean;
            };
            mode: {
                type: import("vue").PropType<import("./components/calendar/props").CalendarViewType>;
                default: string;
                validator(value: any): boolean;
            };
            monthText: {
                type: import("vue").PropType<string[]>;
                default: () => string[];
            };
            weekText: {
                type: import("vue").PropType<string[]>;
                default: () => string[];
            };
            startDate: {
                type: DateConstructor;
                default: () => Date;
            };
            endDate: {
                type: DateConstructor;
                default: () => Date;
            };
            active: {
                type: BooleanConstructor;
                default: boolean;
            };
            type: {
                type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            block: {
                type: BooleanConstructor;
                default: boolean;
            };
            headerFormatter: {
                type: import("vue").PropType<(type: import("./components/calendar/props").CalendarViewType, val: number) => string>;
                default: null;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            modelValue: Date;
            closable: boolean;
            type: "info" | "success" | "warn" | "error" | "primary";
            disabled: boolean;
            active: boolean;
            layerProps: {
                zIndex?: number | undefined;
                modelValue?: boolean | undefined;
                timeout?: number | undefined;
                closable?: boolean | undefined;
                placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
                width?: string | undefined;
                offset?: string | undefined;
                background?: string | undefined;
                borderColor?: string | undefined;
                relate?: string | undefined;
                showTriangle?: boolean | undefined;
                animation?: string | undefined;
                shadow?: boolean | undefined;
                border?: boolean | undefined;
            };
            block: boolean;
            mode: import("./components/calendar/props").CalendarViewType;
            monthText: string[];
            weekText: string[];
            startDate: Date;
            endDate: Date;
            trigger: "click" | "hover" | "custom";
            headerFormatter: (type: import("./components/calendar/props").CalendarViewType, val: number) => string;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: DateConstructor;
                default: () => Date;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            layerProps: {
                type: import("vue").PropType<import("./components/layer/props").LayerPropsType>;
                default: () => {};
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            trigger: {
                type: import("vue").PropType<"click" | "hover" | "custom">;
                default: string;
                validator(value: any): boolean;
            };
            mode: {
                type: import("vue").PropType<import("./components/calendar/props").CalendarViewType>;
                default: string;
                validator(value: any): boolean;
            };
            monthText: {
                type: import("vue").PropType<string[]>;
                default: () => string[];
            };
            weekText: {
                type: import("vue").PropType<string[]>;
                default: () => string[];
            };
            startDate: {
                type: DateConstructor;
                default: () => Date;
            };
            endDate: {
                type: DateConstructor;
                default: () => Date;
            };
            active: {
                type: BooleanConstructor;
                default: boolean;
            };
            type: {
                type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            block: {
                type: BooleanConstructor;
                default: boolean;
            };
            headerFormatter: {
                type: import("vue").PropType<(type: import("./components/calendar/props").CalendarViewType, val: number) => string>;
                default: null;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            openCalendar: () => void;
            closeCalendar: () => void;
        }, {}, {}, {}, {
            modelValue: Date;
            closable: boolean;
            type: "info" | "success" | "warn" | "error" | "primary";
            disabled: boolean;
            active: boolean;
            layerProps: {
                zIndex?: number | undefined;
                modelValue?: boolean | undefined;
                timeout?: number | undefined;
                closable?: boolean | undefined;
                placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
                width?: string | undefined;
                offset?: string | undefined;
                background?: string | undefined;
                borderColor?: string | undefined;
                relate?: string | undefined;
                showTriangle?: boolean | undefined;
                animation?: string | undefined;
                shadow?: boolean | undefined;
                border?: boolean | undefined;
            };
            block: boolean;
            mode: import("./components/calendar/props").CalendarViewType;
            monthText: string[];
            weekText: string[];
            startDate: Date;
            endDate: Date;
            trigger: "click" | "hover" | "custom";
            headerFormatter: (type: import("./components/calendar/props").CalendarViewType, val: number) => string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: DateConstructor;
            default: () => Date;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        layerProps: {
            type: import("vue").PropType<import("./components/layer/props").LayerPropsType>;
            default: () => {};
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        trigger: {
            type: import("vue").PropType<"click" | "hover" | "custom">;
            default: string;
            validator(value: any): boolean;
        };
        mode: {
            type: import("vue").PropType<import("./components/calendar/props").CalendarViewType>;
            default: string;
            validator(value: any): boolean;
        };
        monthText: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
        };
        weekText: {
            type: import("vue").PropType<string[]>;
            default: () => string[];
        };
        startDate: {
            type: DateConstructor;
            default: () => Date;
        };
        endDate: {
            type: DateConstructor;
            default: () => Date;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        type: {
            type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
        headerFormatter: {
            type: import("vue").PropType<(type: import("./components/calendar/props").CalendarViewType, val: number) => string>;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        openCalendar: () => void;
        closeCalendar: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, {
        modelValue: Date;
        closable: boolean;
        type: "info" | "success" | "warn" | "error" | "primary";
        disabled: boolean;
        active: boolean;
        layerProps: {
            zIndex?: number | undefined;
            modelValue?: boolean | undefined;
            timeout?: number | undefined;
            closable?: boolean | undefined;
            placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
            width?: string | undefined;
            offset?: string | undefined;
            background?: string | undefined;
            borderColor?: string | undefined;
            relate?: string | undefined;
            showTriangle?: boolean | undefined;
            animation?: string | undefined;
            shadow?: boolean | undefined;
            border?: boolean | undefined;
        };
        block: boolean;
        mode: import("./components/calendar/props").CalendarViewType;
        monthText: string[];
        weekText: string[];
        startDate: Date;
        endDate: Date;
        trigger: "click" | "hover" | "custom";
        headerFormatter: (type: import("./components/calendar/props").CalendarViewType, val: number) => string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    DateNativePicker: import("vue").DefineComponent<{
        type: {
            type: import("vue").PropType<"time" | "date" | "month" | "datetime">;
            default: string;
            validator(value: any): boolean;
        };
        modelValue: {
            type: DateConstructor;
            default: null;
        };
        max: {
            type: DateConstructor;
            default: null;
        };
        min: {
            type: DateConstructor;
            default: null;
        };
    }, {
        trigger: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        error: (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        type: {
            type: import("vue").PropType<"time" | "date" | "month" | "datetime">;
            default: string;
            validator(value: any): boolean;
        };
        modelValue: {
            type: DateConstructor;
            default: null;
        };
        max: {
            type: DateConstructor;
            default: null;
        };
        min: {
            type: DateConstructor;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
        onError?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: Date;
        type: "time" | "date" | "month" | "datetime";
        max: Date;
        min: Date;
    }, {}>;
    Picker: import("vue").DefineComponent<{
        options: {
            type: import("vue").PropType<import("./components/picker/props").PickerOptionsItemType | import("./components/picker/props").PickerOptionsItemType[]>;
            default: () => {
                values: never[];
                defaultIndex: number;
            };
        };
        showToolbar: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        confirmText: {
            type: StringConstructor;
            default: string;
        };
        cancelText: {
            type: StringConstructor;
            default: string;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        visibleCounts: {
            type: NumberConstructor;
            default: number;
        };
        selectHeight: {
            type: StringConstructor;
            default: string;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        cancel: (...args: any[]) => void;
        change: (...args: any[]) => void;
        confirm: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        options: {
            type: import("vue").PropType<import("./components/picker/props").PickerOptionsItemType | import("./components/picker/props").PickerOptionsItemType[]>;
            default: () => {
                values: never[];
                defaultIndex: number;
            };
        };
        showToolbar: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        confirmText: {
            type: StringConstructor;
            default: string;
        };
        cancelText: {
            type: StringConstructor;
            default: string;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        visibleCounts: {
            type: NumberConstructor;
            default: number;
        };
        selectHeight: {
            type: StringConstructor;
            default: string;
        };
    }>> & {
        onChange?: ((...args: any[]) => any) | undefined;
        onCancel?: ((...args: any[]) => any) | undefined;
        onConfirm?: ((...args: any[]) => any) | undefined;
    }, {
        title: string;
        loading: boolean;
        options: import("./components/picker/props").PickerOptionsItemType | import("./components/picker/props").PickerOptionsItemType[];
        cancelText: string;
        showToolbar: boolean;
        confirmText: string;
        visibleCounts: number;
        selectHeight: string;
    }, {}>;
    Progress: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            value: {
                type: NumberConstructor;
                default: number; /***** 全局默认样式 *****/
            };
            max: {
                type: NumberConstructor;
                default: number;
            }; /***** 辅助样式 *****/
            min: {
                type: NumberConstructor;
                default: number;
            };
            strokeWidth: {
                type: StringConstructor;
                default: null;
            };
            showTip: {
                type: BooleanConstructor;
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            tipColor: {
                type: StringConstructor;
                default: null;
            };
            trackColor: {
                type: StringConstructor;
                default: null;
            };
            tipText: {
                type: StringConstructor;
                default: null;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            square: {
                type: BooleanConstructor;
                default: boolean;
            };
            animation: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            value: {
                type: NumberConstructor;
                default: number; /***** 全局默认样式 *****/
            };
            max: {
                type: NumberConstructor;
                default: number;
            }; /***** 辅助样式 *****/
            min: {
                type: NumberConstructor;
                default: number;
            };
            strokeWidth: {
                type: StringConstructor;
                default: null;
            };
            showTip: {
                type: BooleanConstructor;
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            tipColor: {
                type: StringConstructor;
                default: null;
            };
            trackColor: {
                type: StringConstructor;
                default: null;
            };
            tipText: {
                type: StringConstructor;
                default: null;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            square: {
                type: BooleanConstructor;
                default: boolean;
            };
            animation: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
        }>>, {
            color: string;
            timeout: number;
            round: boolean;
            animation: boolean;
            max: number;
            min: number;
            value: number;
            square: boolean;
            trackColor: string;
            showTip: boolean;
            tipText: string;
            strokeWidth: string;
            tipColor: string;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            value: {
                type: NumberConstructor;
                default: number; /***** 全局默认样式 *****/
            };
            max: {
                type: NumberConstructor;
                default: number;
            }; /***** 辅助样式 *****/
            min: {
                type: NumberConstructor;
                default: number;
            };
            strokeWidth: {
                type: StringConstructor;
                default: null;
            };
            showTip: {
                type: BooleanConstructor;
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            tipColor: {
                type: StringConstructor;
                default: null;
            };
            trackColor: {
                type: StringConstructor;
                default: null;
            };
            tipText: {
                type: StringConstructor;
                default: null;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            square: {
                type: BooleanConstructor;
                default: boolean;
            };
            animation: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
        }>>, {}, {}, {}, {}, {
            color: string;
            timeout: number;
            round: boolean;
            animation: boolean;
            max: number;
            min: number;
            value: number;
            square: boolean;
            trackColor: string;
            showTip: boolean;
            tipText: string;
            strokeWidth: string;
            tipColor: string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        value: {
            type: NumberConstructor;
            default: number; /***** 全局默认样式 *****/
        };
        max: {
            type: NumberConstructor;
            default: number;
        }; /***** 辅助样式 *****/
        min: {
            type: NumberConstructor;
            default: number;
        };
        strokeWidth: {
            type: StringConstructor;
            default: null;
        };
        showTip: {
            type: BooleanConstructor;
            default: boolean;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        tipColor: {
            type: StringConstructor;
            default: null;
        };
        trackColor: {
            type: StringConstructor;
            default: null;
        };
        tipText: {
            type: StringConstructor;
            default: null;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
        animation: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        color: string;
        timeout: number;
        round: boolean;
        animation: boolean;
        max: number;
        min: number;
        value: number;
        square: boolean;
        trackColor: string;
        showTip: boolean;
        tipText: string;
        strokeWidth: string;
        tipColor: string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            tip?(_: {
                value: number;
            }): any;
        };
    });
    Slider: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: NumberConstructor;
                default: number;
            };
            min: {
                type: NumberConstructor;
                default: number;
            };
            max: {
                type: NumberConstructor;
                default: number;
            };
            /***** 指令 *****/
            strokeWidth: {
                type: StringConstructor;
                default: string;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            trackColor: {
                type: StringConstructor;
                default: null;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            vertical: {
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
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            change: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: NumberConstructor;
                default: number;
            };
            min: {
                type: NumberConstructor;
                default: number;
            };
            max: {
                type: NumberConstructor;
                default: number;
            };
            /***** 指令 *****/
            strokeWidth: {
                type: StringConstructor;
                default: string;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            trackColor: {
                type: StringConstructor;
                default: null;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            vertical: {
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
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            color: string;
            modelValue: number;
            disabled: boolean;
            round: boolean;
            max: number;
            min: number;
            square: boolean;
            vertical: boolean;
            trackColor: string;
            strokeWidth: string;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: NumberConstructor;
                default: number;
            };
            min: {
                type: NumberConstructor;
                default: number;
            };
            max: {
                type: NumberConstructor;
                default: number;
            };
            /***** 指令 *****/
            strokeWidth: {
                type: StringConstructor;
                default: string;
            };
            color: {
                type: StringConstructor;
                default: null;
            };
            trackColor: {
                type: StringConstructor;
                default: null;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            vertical: {
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
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {}, {}, {}, {}, {
            color: string;
            modelValue: number;
            disabled: boolean;
            round: boolean;
            max: number;
            min: number;
            square: boolean;
            vertical: boolean;
            trackColor: string;
            strokeWidth: string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        min: {
            type: NumberConstructor;
            default: number;
        };
        max: {
            type: NumberConstructor;
            default: number;
        };
        /***** 指令 *****/
        strokeWidth: {
            type: StringConstructor;
            default: string;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        trackColor: {
            type: StringConstructor;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
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
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, {
        color: string;
        modelValue: number;
        disabled: boolean;
        round: boolean;
        max: number;
        min: number;
        square: boolean;
        vertical: boolean;
        trackColor: string;
        strokeWidth: string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            button?(_: {}): any;
        };
    });
    DatePicker: import("vue").DefineComponent<{
        modelValue: {
            type: DateConstructor;
            default: () => Date;
        };
        startDate: {
            type: DateConstructor;
            default: () => Date;
        };
        endDate: {
            type: DateConstructor;
            default: () => Date;
        };
        mode: {
            type: import("vue").PropType<import("./components/date-picker/props").DatePickerModeType>;
            default: string;
            validator(value: any): boolean;
        };
        showToolbar: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        confirmText: {
            type: StringConstructor;
            default: string;
        };
        cancelText: {
            type: StringConstructor;
            default: string;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        visibleCounts: {
            type: NumberConstructor;
            default: number;
        };
        selectHeight: {
            type: StringConstructor;
            default: string;
        };
        formatter: {
            type: import("vue").PropType<(type: import("./components/date-picker/props").DatePickerTimeType, val: number) => string>;
            default: null;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        cancel: (...args: any[]) => void;
        change: (...args: any[]) => void;
        confirm: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: DateConstructor;
            default: () => Date;
        };
        startDate: {
            type: DateConstructor;
            default: () => Date;
        };
        endDate: {
            type: DateConstructor;
            default: () => Date;
        };
        mode: {
            type: import("vue").PropType<import("./components/date-picker/props").DatePickerModeType>;
            default: string;
            validator(value: any): boolean;
        };
        showToolbar: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        confirmText: {
            type: StringConstructor;
            default: string;
        };
        cancelText: {
            type: StringConstructor;
            default: string;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        visibleCounts: {
            type: NumberConstructor;
            default: number;
        };
        selectHeight: {
            type: StringConstructor;
            default: string;
        };
        formatter: {
            type: import("vue").PropType<(type: import("./components/date-picker/props").DatePickerTimeType, val: number) => string>;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
        onCancel?: ((...args: any[]) => any) | undefined;
        onConfirm?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: Date;
        title: string;
        loading: boolean;
        cancelText: string;
        mode: import("./components/date-picker/props").DatePickerModeType;
        startDate: Date;
        endDate: Date;
        showToolbar: boolean;
        confirmText: string;
        visibleCounts: number;
        selectHeight: string;
        formatter: (type: import("./components/date-picker/props").DatePickerTimeType, val: number) => string;
    }, {}>;
    Field: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            readonly: {
                type: BooleanConstructor;
                default: boolean;
            };
            placeholder: {
                type: StringConstructor;
                default: string;
            };
            type: {
                type: import("vue").PropType<"number" | "textarea" | "text" | "tel" | "password">;
                default: string;
                validator(value: any): boolean;
            };
            size: {
                type: import("vue").PropType<"small" | "medium" | "large">;
                default: string;
                validator(value: any): boolean;
            };
            maxlength: {
                type: NumberConstructor;
                default: number;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            square: {
                type: BooleanConstructor;
                default: boolean;
            };
            prefix: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            suffix: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            prepend: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            append: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            activeType: {
                type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
                validator(value: any): boolean;
            };
            clearable: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: import("vue").PropType<"left" | "right" | "center">;
                default: string;
                validator(value: any): boolean;
            };
            name: {
                type: StringConstructor;
                default: null;
            };
            autofocus: {
                type: BooleanConstructor;
                default: boolean;
            };
            inputMode: {
                type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
                default: string;
                validator(value: any): boolean;
            };
            rows: {
                type: NumberConstructor;
                default: number;
            };
            autosize: {
                type: import("vue").PropType<boolean | import("./components/field/props").FieldAutosizeType>;
                default: boolean;
                validator(value: any): boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onFocus?: ((...args: any[]) => any) | undefined;
            onBlur?: ((...args: any[]) => any) | undefined;
            onInput?: ((...args: any[]) => any) | undefined;
            onKeydown?: ((...args: any[]) => any) | undefined;
            onKeyup?: ((...args: any[]) => any) | undefined;
            onClear?: ((...args: any[]) => any) | undefined;
            "onPrepend-click"?: ((...args: any[]) => any) | undefined;
            "onPrefix-click"?: ((...args: any[]) => any) | undefined;
            "onAppend-click"?: ((...args: any[]) => any) | undefined;
            "onSuffix-click"?: ((...args: any[]) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            input: (...args: any[]) => void;
            clear: (...args: any[]) => void;
            focus: (...args: any[]) => void;
            blur: (...args: any[]) => void;
            keydown: (...args: any[]) => void;
            keyup: (...args: any[]) => void;
            "prepend-click": (...args: any[]) => void;
            "prefix-click": (...args: any[]) => void;
            "append-click": (...args: any[]) => void;
            "suffix-click": (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            readonly: {
                type: BooleanConstructor;
                default: boolean;
            };
            placeholder: {
                type: StringConstructor;
                default: string;
            };
            type: {
                type: import("vue").PropType<"number" | "textarea" | "text" | "tel" | "password">;
                default: string;
                validator(value: any): boolean;
            };
            size: {
                type: import("vue").PropType<"small" | "medium" | "large">;
                default: string;
                validator(value: any): boolean;
            };
            maxlength: {
                type: NumberConstructor;
                default: number;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            square: {
                type: BooleanConstructor;
                default: boolean;
            };
            prefix: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            suffix: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            prepend: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            append: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            activeType: {
                type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
                validator(value: any): boolean;
            };
            clearable: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: import("vue").PropType<"left" | "right" | "center">;
                default: string;
                validator(value: any): boolean;
            };
            name: {
                type: StringConstructor;
                default: null;
            };
            autofocus: {
                type: BooleanConstructor;
                default: boolean;
            };
            inputMode: {
                type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
                default: string;
                validator(value: any): boolean;
            };
            rows: {
                type: NumberConstructor;
                default: number;
            };
            autosize: {
                type: import("vue").PropType<boolean | import("./components/field/props").FieldAutosizeType>;
                default: boolean;
                validator(value: any): boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onFocus?: ((...args: any[]) => any) | undefined;
            onBlur?: ((...args: any[]) => any) | undefined;
            onInput?: ((...args: any[]) => any) | undefined;
            onKeydown?: ((...args: any[]) => any) | undefined;
            onKeyup?: ((...args: any[]) => any) | undefined;
            onClear?: ((...args: any[]) => any) | undefined;
            "onPrepend-click"?: ((...args: any[]) => any) | undefined;
            "onPrefix-click"?: ((...args: any[]) => any) | undefined;
            "onAppend-click"?: ((...args: any[]) => any) | undefined;
            "onSuffix-click"?: ((...args: any[]) => any) | undefined;
        }, {
            modelValue: string | number;
            name: string;
            type: "number" | "textarea" | "text" | "tel" | "password";
            disabled: boolean;
            size: "small" | "medium" | "large";
            round: boolean;
            align: "left" | "right" | "center";
            placeholder: string;
            activeType: "info" | "success" | "warn" | "error" | "primary";
            activeColor: string;
            clearable: boolean;
            square: boolean;
            inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
            maxlength: number;
            readonly: boolean;
            prefix: string | import("./components/icon/props").IconPropsType;
            suffix: string | import("./components/icon/props").IconPropsType;
            prepend: string | import("./components/icon/props").IconPropsType;
            append: string | import("./components/icon/props").IconPropsType;
            autofocus: boolean;
            rows: number;
            autosize: boolean | import("./components/field/props").FieldAutosizeType;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            readonly: {
                type: BooleanConstructor;
                default: boolean;
            };
            placeholder: {
                type: StringConstructor;
                default: string;
            };
            type: {
                type: import("vue").PropType<"number" | "textarea" | "text" | "tel" | "password">;
                default: string;
                validator(value: any): boolean;
            };
            size: {
                type: import("vue").PropType<"small" | "medium" | "large">;
                default: string;
                validator(value: any): boolean;
            };
            maxlength: {
                type: NumberConstructor;
                default: number;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            square: {
                type: BooleanConstructor;
                default: boolean;
            };
            prefix: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            suffix: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            prepend: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            append: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            activeType: {
                type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
                default: string;
                validator(value: any): boolean;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
                validator(value: any): boolean;
            };
            clearable: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: import("vue").PropType<"left" | "right" | "center">;
                default: string;
                validator(value: any): boolean;
            };
            name: {
                type: StringConstructor;
                default: null;
            };
            autofocus: {
                type: BooleanConstructor;
                default: boolean;
            };
            inputMode: {
                type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
                default: string;
                validator(value: any): boolean;
            };
            rows: {
                type: NumberConstructor;
                default: number;
            };
            autosize: {
                type: import("vue").PropType<boolean | import("./components/field/props").FieldAutosizeType>;
                default: boolean;
                validator(value: any): boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onFocus?: ((...args: any[]) => any) | undefined;
            onBlur?: ((...args: any[]) => any) | undefined;
            onInput?: ((...args: any[]) => any) | undefined;
            onKeydown?: ((...args: any[]) => any) | undefined;
            onKeyup?: ((...args: any[]) => any) | undefined;
            onClear?: ((...args: any[]) => any) | undefined;
            "onPrepend-click"?: ((...args: any[]) => any) | undefined;
            "onPrefix-click"?: ((...args: any[]) => any) | undefined;
            "onAppend-click"?: ((...args: any[]) => any) | undefined;
            "onSuffix-click"?: ((...args: any[]) => any) | undefined;
        }, {}, {}, {}, {}, {
            modelValue: string | number;
            name: string;
            type: "number" | "textarea" | "text" | "tel" | "password";
            disabled: boolean;
            size: "small" | "medium" | "large";
            round: boolean;
            align: "left" | "right" | "center";
            placeholder: string;
            activeType: "info" | "success" | "warn" | "error" | "primary";
            activeColor: string;
            clearable: boolean;
            square: boolean;
            inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
            maxlength: number;
            readonly: boolean;
            prefix: string | import("./components/icon/props").IconPropsType;
            suffix: string | import("./components/icon/props").IconPropsType;
            prepend: string | import("./components/icon/props").IconPropsType;
            append: string | import("./components/icon/props").IconPropsType;
            autofocus: boolean;
            rows: number;
            autosize: boolean | import("./components/field/props").FieldAutosizeType;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        readonly: {
            type: BooleanConstructor;
            default: boolean;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        type: {
            type: import("vue").PropType<"number" | "textarea" | "text" | "tel" | "password">;
            default: string;
            validator(value: any): boolean;
        };
        size: {
            type: import("vue").PropType<"small" | "medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        maxlength: {
            type: NumberConstructor;
            default: number;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
        prefix: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        suffix: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        prepend: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        append: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        activeType: {
            type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
            validator(value: any): boolean;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        align: {
            type: import("vue").PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        name: {
            type: StringConstructor;
            default: null;
        };
        autofocus: {
            type: BooleanConstructor;
            default: boolean;
        };
        inputMode: {
            type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
            default: string;
            validator(value: any): boolean;
        };
        rows: {
            type: NumberConstructor;
            default: number;
        };
        autosize: {
            type: import("vue").PropType<boolean | import("./components/field/props").FieldAutosizeType>;
            default: boolean;
            validator(value: any): boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onFocus?: ((...args: any[]) => any) | undefined;
        onBlur?: ((...args: any[]) => any) | undefined;
        onInput?: ((...args: any[]) => any) | undefined;
        onKeydown?: ((...args: any[]) => any) | undefined;
        onKeyup?: ((...args: any[]) => any) | undefined;
        onClear?: ((...args: any[]) => any) | undefined;
        "onPrepend-click"?: ((...args: any[]) => any) | undefined;
        "onPrefix-click"?: ((...args: any[]) => any) | undefined;
        "onAppend-click"?: ((...args: any[]) => any) | undefined;
        "onSuffix-click"?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        input: (...args: any[]) => void;
        clear: (...args: any[]) => void;
        focus: (...args: any[]) => void;
        blur: (...args: any[]) => void;
        keydown: (...args: any[]) => void;
        keyup: (...args: any[]) => void;
        "prepend-click": (...args: any[]) => void;
        "prefix-click": (...args: any[]) => void;
        "append-click": (...args: any[]) => void;
        "suffix-click": (...args: any[]) => void;
    }, string, {
        modelValue: string | number;
        name: string;
        type: "number" | "textarea" | "text" | "tel" | "password";
        disabled: boolean;
        size: "small" | "medium" | "large";
        round: boolean;
        align: "left" | "right" | "center";
        placeholder: string;
        activeType: "info" | "success" | "warn" | "error" | "primary";
        activeColor: string;
        clearable: boolean;
        square: boolean;
        inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
        maxlength: number;
        readonly: boolean;
        prefix: string | import("./components/icon/props").IconPropsType;
        suffix: string | import("./components/icon/props").IconPropsType;
        prepend: string | import("./components/icon/props").IconPropsType;
        append: string | import("./components/icon/props").IconPropsType;
        autofocus: boolean;
        rows: number;
        autosize: boolean | import("./components/field/props").FieldAutosizeType;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            prepend?(_: {}): any;
            prefix?(_: {}): any;
            suffix?(_: {}): any;
            append?(_: {}): any;
        };
    });
    Form: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            width: {
                type: StringConstructor;
                default: null;
            };
            block: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: StringConstructor;
                default: string;
            };
            labelBlock: {
                type: BooleanConstructor;
                default: boolean;
            };
            labelWidth: {
                type: StringConstructor;
                default: null;
            };
            labelOffset: {
                type: StringConstructor;
                default: null;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            width: {
                type: StringConstructor;
                default: null;
            };
            block: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: StringConstructor;
                default: string;
            };
            labelBlock: {
                type: BooleanConstructor;
                default: boolean;
            };
            labelWidth: {
                type: StringConstructor;
                default: null;
            };
            labelOffset: {
                type: StringConstructor;
                default: null;
            };
        }>>, {
            width: string;
            align: string;
            block: boolean;
            labelBlock: boolean;
            labelWidth: string;
            labelOffset: string;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            width: {
                type: StringConstructor;
                default: null;
            };
            block: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: StringConstructor;
                default: string;
            };
            labelBlock: {
                type: BooleanConstructor;
                default: boolean;
            };
            labelWidth: {
                type: StringConstructor;
                default: null;
            };
            labelOffset: {
                type: StringConstructor;
                default: null;
            };
        }>>, {}, {}, {}, {}, {
            width: string;
            align: string;
            block: boolean;
            labelBlock: boolean;
            labelWidth: string;
            labelOffset: string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        width: {
            type: StringConstructor;
            default: null;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
        align: {
            type: StringConstructor;
            default: string;
        };
        labelBlock: {
            type: BooleanConstructor;
            default: boolean;
        };
        labelWidth: {
            type: StringConstructor;
            default: null;
        };
        labelOffset: {
            type: StringConstructor;
            default: null;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        width: string;
        align: string;
        block: boolean;
        labelBlock: boolean;
        labelWidth: string;
        labelOffset: string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    FormEl: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            align: {
                type: StringConstructor;
                default: null;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            labelWidth: {
                type: StringConstructor;
                default: null;
            };
            labelOffset: {
                type: StringConstructor;
                default: null;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            align: {
                type: StringConstructor;
                default: null;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            labelWidth: {
                type: StringConstructor;
                default: null;
            };
            labelOffset: {
                type: StringConstructor;
                default: null;
            };
        }>>, {
            label: string;
            width: string;
            align: string;
            labelWidth: string;
            labelOffset: string;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            align: {
                type: StringConstructor;
                default: null;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            labelWidth: {
                type: StringConstructor;
                default: null;
            };
            labelOffset: {
                type: StringConstructor;
                default: null;
            };
        }>>, {}, {}, {}, {}, {
            label: string;
            width: string;
            align: string;
            labelWidth: string;
            labelOffset: string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        align: {
            type: StringConstructor;
            default: null;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        label: {
            type: StringConstructor;
            default: string;
        };
        labelWidth: {
            type: StringConstructor;
            default: null;
        };
        labelOffset: {
            type: StringConstructor;
            default: null;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        label: string;
        width: string;
        align: string;
        labelWidth: string;
        labelOffset: string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Image: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            src: {
                type: StringConstructor;
                default: string;
            };
            fit: {
                type: import("vue").PropType<import("./components/image/props").ImageFillType>;
                default: string;
                validator(value: any): boolean;
            };
            alt: {
                type: StringConstructor;
                default: string;
            };
            showError: {
                type: BooleanConstructor;
                default: boolean;
            };
            showLoading: {
                type: BooleanConstructor;
                default: boolean;
            };
            lazyLoad: {
                type: BooleanConstructor; /***** 组件 *****/
                default: boolean;
            };
            root: {
                type: StringConstructor;
                default: null;
            };
            loadIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            errorIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            height: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            onError?: ((...args: any[]) => any) | undefined;
            onSuccess?: ((...args: any[]) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            success: (...args: any[]) => void;
            error: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            src: {
                type: StringConstructor;
                default: string;
            };
            fit: {
                type: import("vue").PropType<import("./components/image/props").ImageFillType>;
                default: string;
                validator(value: any): boolean;
            };
            alt: {
                type: StringConstructor;
                default: string;
            };
            showError: {
                type: BooleanConstructor;
                default: boolean;
            };
            showLoading: {
                type: BooleanConstructor;
                default: boolean;
            };
            lazyLoad: {
                type: BooleanConstructor; /***** 组件 *****/
                default: boolean;
            };
            root: {
                type: StringConstructor;
                default: null;
            };
            loadIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            errorIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            height: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            onError?: ((...args: any[]) => any) | undefined;
            onSuccess?: ((...args: any[]) => any) | undefined;
        }, {
            round: boolean;
            width: string;
            height: string;
            alt: string;
            src: string;
            loadIcon: string | import("./components/icon/props").IconPropsType;
            root: string;
            fit: import("./components/image/props").ImageFillType;
            showError: boolean;
            showLoading: boolean;
            lazyLoad: boolean;
            errorIcon: string | import("./components/icon/props").IconPropsType;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            src: {
                type: StringConstructor;
                default: string;
            };
            fit: {
                type: import("vue").PropType<import("./components/image/props").ImageFillType>;
                default: string;
                validator(value: any): boolean;
            };
            alt: {
                type: StringConstructor;
                default: string;
            };
            showError: {
                type: BooleanConstructor;
                default: boolean;
            };
            showLoading: {
                type: BooleanConstructor;
                default: boolean;
            };
            lazyLoad: {
                type: BooleanConstructor; /***** 组件 *****/
                default: boolean;
            };
            root: {
                type: StringConstructor;
                default: null;
            };
            loadIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            errorIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            round: {
                type: BooleanConstructor;
                default: boolean;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            height: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            onError?: ((...args: any[]) => any) | undefined;
            onSuccess?: ((...args: any[]) => any) | undefined;
        }, {}, {}, {}, {}, {
            round: boolean;
            width: string;
            height: string;
            alt: string;
            src: string;
            loadIcon: string | import("./components/icon/props").IconPropsType;
            root: string;
            fit: import("./components/image/props").ImageFillType;
            showError: boolean;
            showLoading: boolean;
            lazyLoad: boolean;
            errorIcon: string | import("./components/icon/props").IconPropsType;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        src: {
            type: StringConstructor;
            default: string;
        };
        fit: {
            type: import("vue").PropType<import("./components/image/props").ImageFillType>;
            default: string;
            validator(value: any): boolean;
        };
        alt: {
            type: StringConstructor;
            default: string;
        };
        showError: {
            type: BooleanConstructor;
            default: boolean;
        };
        showLoading: {
            type: BooleanConstructor;
            default: boolean;
        };
        lazyLoad: {
            type: BooleanConstructor; /***** 组件 *****/
            default: boolean;
        };
        root: {
            type: StringConstructor;
            default: null;
        };
        loadIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        errorIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        height: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        onError?: ((...args: any[]) => any) | undefined;
        onSuccess?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        success: (...args: any[]) => void;
        error: (...args: any[]) => void;
    }, string, {
        round: boolean;
        width: string;
        height: string;
        alt: string;
        src: string;
        loadIcon: string | import("./components/icon/props").IconPropsType;
        root: string;
        fit: import("./components/image/props").ImageFillType;
        showError: boolean;
        showLoading: boolean;
        lazyLoad: boolean;
        errorIcon: string | import("./components/icon/props").IconPropsType;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            loading?(_: {}): any;
            error?(_: {}): any;
        };
    });
    ColorPicker: import("vue").DefineComponent<{
        modelValue: {
            type: StringConstructor;
            default: string;
        };
        showAlpha: {
            type: BooleanConstructor;
            default: boolean;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: StringConstructor;
            default: string;
        };
        showAlpha: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: string;
        showAlpha: boolean;
    }, {}>;
    List: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            loading: {
                type: BooleanConstructor;
                default: boolean;
            };
            error: {
                type: BooleanConstructor;
                default: boolean;
            };
            finished: {
                type: BooleanConstructor;
                default: boolean;
            };
            loadingText: {
                type: StringConstructor;
                default: string;
            };
            errorText: {
                type: StringConstructor;
                default: string;
            };
            finishedText: {
                type: StringConstructor;
                default: string;
            };
            immediateLoad: {
                type: BooleanConstructor;
                default: boolean;
            };
            content: {
                type: StringConstructor;
                default: string;
            };
            scrollEl: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            onLoad?: ((...args: any[]) => any) | undefined;
            "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
            "onUpdate:error"?: ((...args: any[]) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            load: (...args: any[]) => void;
            "update:loading": (...args: any[]) => void;
            "update:error": (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            loading: {
                type: BooleanConstructor;
                default: boolean;
            };
            error: {
                type: BooleanConstructor;
                default: boolean;
            };
            finished: {
                type: BooleanConstructor;
                default: boolean;
            };
            loadingText: {
                type: StringConstructor;
                default: string;
            };
            errorText: {
                type: StringConstructor;
                default: string;
            };
            finishedText: {
                type: StringConstructor;
                default: string;
            };
            immediateLoad: {
                type: BooleanConstructor;
                default: boolean;
            };
            content: {
                type: StringConstructor;
                default: string;
            };
            scrollEl: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            onLoad?: ((...args: any[]) => any) | undefined;
            "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
            "onUpdate:error"?: ((...args: any[]) => any) | undefined;
        }, {
            loading: boolean;
            error: boolean;
            content: string;
            finished: boolean;
            loadingText: string;
            errorText: string;
            finishedText: string;
            immediateLoad: boolean;
            scrollEl: string;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            loading: {
                type: BooleanConstructor;
                default: boolean;
            };
            error: {
                type: BooleanConstructor;
                default: boolean;
            };
            finished: {
                type: BooleanConstructor;
                default: boolean;
            };
            loadingText: {
                type: StringConstructor;
                default: string;
            };
            errorText: {
                type: StringConstructor;
                default: string;
            };
            finishedText: {
                type: StringConstructor;
                default: string;
            };
            immediateLoad: {
                type: BooleanConstructor;
                default: boolean;
            };
            content: {
                type: StringConstructor;
                default: string;
            };
            scrollEl: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            onLoad?: ((...args: any[]) => any) | undefined;
            "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
            "onUpdate:error"?: ((...args: any[]) => any) | undefined;
        }, {}, {}, {}, {}, {
            loading: boolean;
            error: boolean;
            content: string;
            finished: boolean;
            loadingText: string;
            errorText: string;
            finishedText: string;
            immediateLoad: boolean;
            scrollEl: string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        error: {
            type: BooleanConstructor;
            default: boolean;
        };
        finished: {
            type: BooleanConstructor;
            default: boolean;
        };
        loadingText: {
            type: StringConstructor;
            default: string;
        };
        errorText: {
            type: StringConstructor;
            default: string;
        };
        finishedText: {
            type: StringConstructor;
            default: string;
        };
        immediateLoad: {
            type: BooleanConstructor;
            default: boolean;
        };
        content: {
            type: StringConstructor;
            default: string;
        };
        scrollEl: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        onLoad?: ((...args: any[]) => any) | undefined;
        "onUpdate:loading"?: ((...args: any[]) => any) | undefined;
        "onUpdate:error"?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        load: (...args: any[]) => void;
        "update:loading": (...args: any[]) => void;
        "update:error": (...args: any[]) => void;
    }, string, {
        loading: boolean;
        error: boolean;
        content: string;
        finished: boolean;
        loadingText: string;
        errorText: string;
        finishedText: string;
        immediateLoad: boolean;
        scrollEl: string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
            finished?(_: {}): any;
            loading?(_: {}): any;
            error?(_: {}): any;
            content?(_: {}): any;
        };
    });
    Modal: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            title: {
                type: StringConstructor;
                default: string;
            };
            center: {
                type: BooleanConstructor;
                default: boolean;
            };
            ellipsis: {
                type: BooleanConstructor;
                default: boolean;
            };
            content: {
                type: StringConstructor;
                default: string;
            };
            footer: {
                type: StringConstructor;
                default: null;
            };
            showTimes: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            overlayColor: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            radius: {
                type: StringConstructor;
                default: null;
            };
            animation: {
                type: StringConstructor;
                default: string;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            fullScreen: {
                type: BooleanConstructor;
                default: boolean;
            };
            __ignorePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            show: (...args: any[]) => void;
            showing: (...args: any[]) => void;
            shown: (...args: any[]) => void;
            hide: (...args: any[]) => void;
            hidding: (...args: any[]) => void;
            hidden: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            title: {
                type: StringConstructor;
                default: string;
            };
            center: {
                type: BooleanConstructor;
                default: boolean;
            };
            ellipsis: {
                type: BooleanConstructor;
                default: boolean;
            };
            content: {
                type: StringConstructor;
                default: string;
            };
            footer: {
                type: StringConstructor;
                default: null;
            };
            showTimes: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            overlayColor: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            radius: {
                type: StringConstructor;
                default: null;
            };
            animation: {
                type: StringConstructor;
                default: string;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            fullScreen: {
                type: BooleanConstructor;
                default: boolean;
            };
            __ignorePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            mountEl: string;
            zIndex: number;
            modelValue: boolean;
            timeout: number;
            closable: boolean;
            usePadding: boolean;
            footer: string;
            title: string;
            overlayColor: string;
            width: string;
            showTimes: boolean;
            animation: string;
            center: boolean;
            content: string;
            ellipsis: boolean;
            radius: string;
            fullScreen: boolean;
            __ignorePadding: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            title: {
                type: StringConstructor;
                default: string;
            };
            center: {
                type: BooleanConstructor;
                default: boolean;
            };
            ellipsis: {
                type: BooleanConstructor;
                default: boolean;
            };
            content: {
                type: StringConstructor;
                default: string;
            };
            footer: {
                type: StringConstructor;
                default: null;
            };
            showTimes: {
                type: BooleanConstructor;
                default: boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            overlayColor: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            width: {
                type: StringConstructor;
                default: null;
            };
            radius: {
                type: StringConstructor;
                default: null;
            };
            animation: {
                type: StringConstructor;
                default: string;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            fullScreen: {
                type: BooleanConstructor;
                default: boolean;
            };
            __ignorePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
        }, {}, {}, {}, {
            mountEl: string;
            zIndex: number;
            modelValue: boolean;
            timeout: number;
            closable: boolean;
            usePadding: boolean;
            footer: string;
            title: string;
            overlayColor: string;
            width: string;
            showTimes: boolean;
            animation: string;
            center: boolean;
            content: string;
            ellipsis: boolean;
            radius: string;
            fullScreen: boolean;
            __ignorePadding: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
        ellipsis: {
            type: BooleanConstructor;
            default: boolean;
        };
        content: {
            type: StringConstructor;
            default: string;
        };
        footer: {
            type: StringConstructor;
            default: null;
        };
        showTimes: {
            type: BooleanConstructor;
            default: boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        overlayColor: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        width: {
            type: StringConstructor;
            default: null;
        };
        radius: {
            type: StringConstructor;
            default: null;
        };
        animation: {
            type: StringConstructor;
            default: string;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        fullScreen: {
            type: BooleanConstructor;
            default: boolean;
        };
        __ignorePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onShowing?: ((...args: any[]) => any) | undefined;
        onShown?: ((...args: any[]) => any) | undefined;
        onHide?: ((...args: any[]) => any) | undefined;
        onHidding?: ((...args: any[]) => any) | undefined;
        onHidden?: ((...args: any[]) => any) | undefined;
    }, {
        $$el: import("vue").ComputedRef<HTMLElement | null>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        show: (...args: any[]) => void;
        showing: (...args: any[]) => void;
        shown: (...args: any[]) => void;
        hide: (...args: any[]) => void;
        hidding: (...args: any[]) => void;
        hidden: (...args: any[]) => void;
    }, string, {
        mountEl: string;
        zIndex: number;
        modelValue: boolean;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        footer: string;
        title: string;
        overlayColor: string;
        width: string;
        showTimes: boolean;
        animation: string;
        center: boolean;
        content: string;
        ellipsis: boolean;
        radius: string;
        fullScreen: boolean;
        __ignorePadding: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            title?(_: {}): any;
            default?(_: {}): any;
            footer?(_: {}): any;
        };
    });
    Page: import("vue").DefineComponent<{
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        total: {
            type: NumberConstructor;
            default: number;
        };
        overNumber: {
            type: NumberConstructor;
            default: number;
            validator(value: any): boolean;
        };
        prevText: {
            type: StringConstructor;
            default: null;
        };
        nextText: {
            type: StringConstructor;
            default: null;
        };
        prevIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        nextIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        simple: {
            type: BooleanConstructor;
            default: boolean;
        };
        firstText: {
            type: StringConstructor;
            default: null;
        };
        lastText: {
            type: StringConstructor;
            default: null;
        };
        firstIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        lastIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        total: {
            type: NumberConstructor;
            default: number;
        };
        overNumber: {
            type: NumberConstructor;
            default: number;
            validator(value: any): boolean;
        };
        prevText: {
            type: StringConstructor;
            default: null;
        };
        nextText: {
            type: StringConstructor;
            default: null;
        };
        prevIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        nextIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        simple: {
            type: BooleanConstructor;
            default: boolean;
        };
        firstText: {
            type: StringConstructor;
            default: null;
        };
        lastText: {
            type: StringConstructor;
            default: null;
        };
        firstIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        lastIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        color: {
            type: StringConstructor;
            default: null;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        color: string;
        modelValue: number;
        active: boolean;
        total: number;
        overNumber: number;
        prevText: string;
        nextText: string;
        prevIcon: string | import("./components/icon/props").IconPropsType;
        nextIcon: string | import("./components/icon/props").IconPropsType;
        simple: boolean;
        firstText: string;
        lastText: string;
        firstIcon: string | import("./components/icon/props").IconPropsType;
        lastIcon: string | import("./components/icon/props").IconPropsType;
    }, {}>;
    Search: import("vue").DefineComponent<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        type: {
            type: StringConstructor;
            default: string;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: null;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        maxlength: {
            type: NumberConstructor;
            default: number;
        };
        autofocus: {
            type: BooleanConstructor;
            default: boolean;
        };
        showCancel: {
            type: BooleanConstructor;
            default: boolean;
        };
        cancelText: {
            type: StringConstructor;
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        readonly: {
            type: BooleanConstructor;
            default: boolean;
        };
        align: {
            type: import("vue").PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        leftIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        rightIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        inputMode: {
            type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
            default: string;
            validator(value: any): boolean;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        search: (...args: any[]) => void;
        input: (...args: any[]) => void;
        clear: (...args: any[]) => void;
        focus: (...args: any[]) => void;
        blur: (...args: any[]) => void;
        "left-click": (...args: any[]) => void;
        "right-click": (...args: any[]) => void;
        keydown: (...args: any[]) => void;
        keyup: (...args: any[]) => void;
        cancel: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        type: {
            type: StringConstructor;
            default: string;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: null;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        maxlength: {
            type: NumberConstructor;
            default: number;
        };
        autofocus: {
            type: BooleanConstructor;
            default: boolean;
        };
        showCancel: {
            type: BooleanConstructor;
            default: boolean;
        };
        cancelText: {
            type: StringConstructor;
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        readonly: {
            type: BooleanConstructor;
            default: boolean;
        };
        align: {
            type: import("vue").PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        leftIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        rightIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        inputMode: {
            type: import("vue").PropType<"search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric">;
            default: string;
            validator(value: any): boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onFocus?: ((...args: any[]) => any) | undefined;
        onBlur?: ((...args: any[]) => any) | undefined;
        onInput?: ((...args: any[]) => any) | undefined;
        onKeydown?: ((...args: any[]) => any) | undefined;
        onKeyup?: ((...args: any[]) => any) | undefined;
        onClear?: ((...args: any[]) => any) | undefined;
        "onLeft-click"?: ((...args: any[]) => any) | undefined;
        "onRight-click"?: ((...args: any[]) => any) | undefined;
        onCancel?: ((...args: any[]) => any) | undefined;
        onSearch?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: string | number;
        type: string;
        label: string;
        disabled: boolean;
        round: boolean;
        showCancel: boolean;
        cancelText: string;
        align: "left" | "right" | "center";
        placeholder: string;
        clearable: boolean;
        leftIcon: string | import("./components/icon/props").IconPropsType;
        rightIcon: string | import("./components/icon/props").IconPropsType;
        inputMode: "search" | "text" | "url" | "none" | "email" | "tel" | "decimal" | "numeric";
        maxlength: number;
        readonly: boolean;
        autofocus: boolean;
    }, {}>;
    Select: import("vue").DefineComponent<{
        modelValue: {
            type: import("vue").PropType<any>;
            default: null;
        };
        options: {
            type: import("vue").PropType<any[]>;
            default: never[];
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: import("vue").PropType<"small" | "medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        layerProps: {
            type: import("vue").PropType<import("./components/layer/props").LayerPropsType>;
            default: () => {};
        };
        height: {
            type: StringConstructor;
            default: null;
        };
        activeType: {
            type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
            validator(value: any): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        icon: {
            type: StringConstructor;
            default: string;
        };
        name: {
            type: StringConstructor;
            default: null;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
        multiple: {
            type: BooleanConstructor;
            default: boolean;
        };
        filterMethod: {
            type: import("vue").PropType<(label: string | string[]) => string>;
            default: null;
        };
        showSelected: {
            type: BooleanConstructor;
            default: boolean;
        };
        selectedIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: import("vue").PropType<import("./components/select/props").SelectOptionsItemPropsType>;
            default: () => {
                label: string;
                value: string;
            };
        };
        emptyText: {
            type: StringConstructor;
            default: string;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        clear: (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: import("vue").PropType<any>;
            default: null;
        };
        options: {
            type: import("vue").PropType<any[]>;
            default: never[];
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        size: {
            type: import("vue").PropType<"small" | "medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        layerProps: {
            type: import("vue").PropType<import("./components/layer/props").LayerPropsType>;
            default: () => {};
        };
        height: {
            type: StringConstructor;
            default: null;
        };
        activeType: {
            type: import("vue").PropType<"info" | "success" | "warn" | "error" | "primary">;
            default: string;
            validator(value: any): boolean;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
            validator(value: any): boolean;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        icon: {
            type: StringConstructor;
            default: string;
        };
        name: {
            type: StringConstructor;
            default: null;
        };
        round: {
            type: BooleanConstructor;
            default: boolean;
        };
        square: {
            type: BooleanConstructor;
            default: boolean;
        };
        multiple: {
            type: BooleanConstructor;
            default: boolean;
        };
        filterMethod: {
            type: import("vue").PropType<(label: string | string[]) => string>;
            default: null;
        };
        showSelected: {
            type: BooleanConstructor;
            default: boolean;
        };
        selectedIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        clearable: {
            type: BooleanConstructor;
            default: boolean;
        };
        props: {
            type: import("vue").PropType<import("./components/select/props").SelectOptionsItemPropsType>;
            default: () => {
                label: string;
                value: string;
            };
        };
        emptyText: {
            type: StringConstructor;
            default: string;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
        onClear?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: any;
        name: string;
        props: import("./components/select/props").SelectOptionsItemPropsType;
        disabled: boolean;
        size: "small" | "medium" | "large";
        icon: string;
        round: boolean;
        height: string;
        options: any[];
        multiple: boolean;
        placeholder: string;
        activeType: "info" | "success" | "warn" | "error" | "primary";
        activeColor: string;
        filterMethod: (label: string | string[]) => string;
        clearable: boolean;
        layerProps: {
            zIndex?: number | undefined;
            modelValue?: boolean | undefined;
            timeout?: number | undefined;
            closable?: boolean | undefined;
            placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
            width?: string | undefined;
            offset?: string | undefined;
            background?: string | undefined;
            borderColor?: string | undefined;
            relate?: string | undefined;
            showTriangle?: boolean | undefined;
            animation?: string | undefined;
            shadow?: boolean | undefined;
            border?: boolean | undefined;
        };
        square: boolean;
        selectedIcon: string | import("./components/icon/props").IconPropsType;
        showSelected: boolean;
        emptyText: string;
    }, {}>;
    Skeleton: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            loading: {
                type: BooleanConstructor; /***** 全局默认样式 *****/
                default: boolean;
            };
            rows: {
                type: NumberConstructor;
                /***** 辅助样式 *****/
                default: number;
                validator(value: number): boolean;
            };
            rowWidth: {
                type: import("vue").PropType<string | string[]>;
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
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            loading: {
                type: BooleanConstructor; /***** 全局默认样式 *****/
                default: boolean;
            };
            rows: {
                type: NumberConstructor;
                /***** 辅助样式 *****/
                default: number;
                validator(value: number): boolean;
            };
            rowWidth: {
                type: import("vue").PropType<string | string[]>;
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
        }, Readonly<import("vue").ExtractPropTypes<{
            loading: {
                type: BooleanConstructor; /***** 全局默认样式 *****/
                default: boolean;
            };
            rows: {
                type: NumberConstructor;
                /***** 辅助样式 *****/
                default: number;
                validator(value: number): boolean;
            };
            rowWidth: {
                type: import("vue").PropType<string | string[]>;
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
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        loading: {
            type: BooleanConstructor; /***** 全局默认样式 *****/
            default: boolean;
        };
        rows: {
            type: NumberConstructor;
            /***** 辅助样式 *****/
            default: number;
            validator(value: number): boolean;
        };
        rowWidth: {
            type: import("vue").PropType<string | string[]>;
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
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
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
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Steps: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            active: {
                type: NumberConstructor;
                default: number; /***** 辅助样式 *****/
            };
            vertical: {
                type: BooleanConstructor;
                default: boolean;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
            };
            inactiveColor: {
                type: StringConstructor;
                default: null;
            };
            activeIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            inactiveIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            active: {
                type: NumberConstructor;
                default: number; /***** 辅助样式 *****/
            };
            vertical: {
                type: BooleanConstructor;
                default: boolean;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
            };
            inactiveColor: {
                type: StringConstructor;
                default: null;
            };
            activeIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            inactiveIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
        }>>, {
            active: number;
            activeColor: string;
            vertical: boolean;
            activeIcon: string | import("./components/icon/props").IconPropsType;
            inactiveIcon: string | import("./components/icon/props").IconPropsType;
            inactiveColor: string;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            active: {
                type: NumberConstructor;
                default: number; /***** 辅助样式 *****/
            };
            vertical: {
                type: BooleanConstructor;
                default: boolean;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
            };
            inactiveColor: {
                type: StringConstructor;
                default: null;
            };
            activeIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            inactiveIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
        }>>, {}, {}, {}, {}, {
            active: number;
            activeColor: string;
            vertical: boolean;
            activeIcon: string | import("./components/icon/props").IconPropsType;
            inactiveIcon: string | import("./components/icon/props").IconPropsType;
            inactiveColor: string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        active: {
            type: NumberConstructor;
            default: number; /***** 辅助样式 *****/
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
        };
        inactiveColor: {
            type: StringConstructor;
            default: null;
        };
        activeIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        inactiveIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
    }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        active: number;
        activeColor: string;
        vertical: boolean;
        activeIcon: string | import("./components/icon/props").IconPropsType;
        inactiveIcon: string | import("./components/icon/props").IconPropsType;
        inactiveColor: string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Step: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{}>>, {}, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}, {}, {}, {}>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Stepper: import("vue").DefineComponent<{
        modelValue: {
            type: NumberConstructor; /***** 全局默认样式 *****/
            default: number;
        };
        step: {
            type: NumberConstructor;
            default: number;
        };
        size: {
            type: import("vue").PropType<"small" | "medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        min: {
            type: NumberConstructor;
            default: null;
        };
        max: {
            type: NumberConstructor;
            default: null;
        };
        digit: {
            type: NumberConstructor;
            default: number;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabledPlus: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabledMinus: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabledInput: {
            type: BooleanConstructor;
            default: boolean;
        };
        showPlus: {
            type: BooleanConstructor;
            default: boolean;
        };
        showMinus: {
            type: BooleanConstructor;
            default: boolean;
        };
        showInput: {
            type: BooleanConstructor;
            default: boolean;
        };
        inputWidth: {
            type: StringConstructor;
            default: null;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        inputAlign: {
            type: import("vue").PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: NumberConstructor; /***** 全局默认样式 *****/
            default: number;
        };
        step: {
            type: NumberConstructor;
            default: number;
        };
        size: {
            type: import("vue").PropType<"small" | "medium" | "large">;
            default: string;
            validator(value: any): boolean;
        };
        min: {
            type: NumberConstructor;
            default: null;
        };
        max: {
            type: NumberConstructor;
            default: null;
        };
        digit: {
            type: NumberConstructor;
            default: number;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabledPlus: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabledMinus: {
            type: BooleanConstructor;
            default: boolean;
        };
        disabledInput: {
            type: BooleanConstructor;
            default: boolean;
        };
        showPlus: {
            type: BooleanConstructor;
            default: boolean;
        };
        showMinus: {
            type: BooleanConstructor;
            default: boolean;
        };
        showInput: {
            type: BooleanConstructor;
            default: boolean;
        };
        inputWidth: {
            type: StringConstructor;
            default: null;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        inputAlign: {
            type: import("vue").PropType<"left" | "right" | "center">;
            default: string;
            validator(value: any): boolean;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        modelValue: number;
        disabled: boolean;
        size: "small" | "medium" | "large";
        active: boolean;
        border: boolean;
        max: number;
        min: number;
        step: number;
        digit: number;
        disabledPlus: boolean;
        disabledMinus: boolean;
        disabledInput: boolean;
        showPlus: boolean;
        showMinus: boolean;
        showInput: boolean;
        inputWidth: string;
        inputAlign: "left" | "right" | "center";
    }, {}>;
    NumberKeyboard: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            showDecimal: {
                type: BooleanConstructor;
                default: boolean;
            };
            showDelete: {
                type: BooleanConstructor;
                default: boolean;
            };
            showComplete: {
                type: BooleanConstructor;
                default: boolean;
            };
            show: {
                type: BooleanConstructor;
                default: boolean;
            };
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            maxlength: {
                type: NumberConstructor;
                default: number;
            };
            deleteText: {
                type: StringConstructor;
                default: string;
            };
            completeText: {
                type: StringConstructor;
                default: string;
            };
            promiseEmpty: {
                type: BooleanConstructor;
                default: boolean;
            };
            active: {
                type: BooleanConstructor;
                default: boolean;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            overlayColor: {
                type: StringConstructor;
                default: string;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            calibration: {
                type: BooleanConstructor;
                default: boolean;
            };
            showX: {
                type: BooleanConstructor;
                default: boolean;
            };
            random: {
                type: BooleanConstructor;
                default: boolean;
            };
            title: {
                type: StringConstructor;
                default: null;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
            onInput?: ((...args: any[]) => any) | undefined;
            "onUpdate:show"?: ((...args: any[]) => any) | undefined;
            onDelete?: ((...args: any[]) => any) | undefined;
            onComplete?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            show: (...args: any[]) => void;
            showing: (...args: any[]) => void;
            shown: (...args: any[]) => void;
            hide: (...args: any[]) => void;
            hidding: (...args: any[]) => void;
            hidden: (...args: any[]) => void;
            input: (...args: any[]) => void;
            delete: (...args: any[]) => void;
            complete: (...args: any[]) => void;
            "update:show": (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            showDecimal: {
                type: BooleanConstructor;
                default: boolean;
            };
            showDelete: {
                type: BooleanConstructor;
                default: boolean;
            };
            showComplete: {
                type: BooleanConstructor;
                default: boolean;
            };
            show: {
                type: BooleanConstructor;
                default: boolean;
            };
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            maxlength: {
                type: NumberConstructor;
                default: number;
            };
            deleteText: {
                type: StringConstructor;
                default: string;
            };
            completeText: {
                type: StringConstructor;
                default: string;
            };
            promiseEmpty: {
                type: BooleanConstructor;
                default: boolean;
            };
            active: {
                type: BooleanConstructor;
                default: boolean;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            overlayColor: {
                type: StringConstructor;
                default: string;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            calibration: {
                type: BooleanConstructor;
                default: boolean;
            };
            showX: {
                type: BooleanConstructor;
                default: boolean;
            };
            random: {
                type: BooleanConstructor;
                default: boolean;
            };
            title: {
                type: StringConstructor;
                default: null;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
            onInput?: ((...args: any[]) => any) | undefined;
            "onUpdate:show"?: ((...args: any[]) => any) | undefined;
            onDelete?: ((...args: any[]) => any) | undefined;
            onComplete?: ((...args: any[]) => any) | undefined;
        }, {
            mountEl: string;
            zIndex: number;
            modelValue: string | number;
            timeout: number;
            closable: boolean;
            usePadding: boolean;
            show: boolean;
            title: string;
            overlayColor: string;
            active: boolean;
            border: boolean;
            maxlength: number;
            showDecimal: boolean;
            showDelete: boolean;
            showComplete: boolean;
            deleteText: string;
            completeText: string;
            promiseEmpty: boolean;
            calibration: boolean;
            showX: boolean;
            random: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            showDecimal: {
                type: BooleanConstructor;
                default: boolean;
            };
            showDelete: {
                type: BooleanConstructor;
                default: boolean;
            };
            showComplete: {
                type: BooleanConstructor;
                default: boolean;
            };
            show: {
                type: BooleanConstructor;
                default: boolean;
            };
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            closable: {
                type: BooleanConstructor;
                default: boolean;
            };
            maxlength: {
                type: NumberConstructor;
                default: number;
            };
            deleteText: {
                type: StringConstructor;
                default: string;
            };
            completeText: {
                type: StringConstructor;
                default: string;
            };
            promiseEmpty: {
                type: BooleanConstructor;
                default: boolean;
            };
            active: {
                type: BooleanConstructor;
                default: boolean;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            overlayColor: {
                type: StringConstructor;
                default: string;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            calibration: {
                type: BooleanConstructor;
                default: boolean;
            };
            showX: {
                type: BooleanConstructor;
                default: boolean;
            };
            random: {
                type: BooleanConstructor;
                default: boolean;
            };
            title: {
                type: StringConstructor;
                default: null;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onShowing?: ((...args: any[]) => any) | undefined;
            onShown?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
            onHidding?: ((...args: any[]) => any) | undefined;
            onHidden?: ((...args: any[]) => any) | undefined;
            onInput?: ((...args: any[]) => any) | undefined;
            "onUpdate:show"?: ((...args: any[]) => any) | undefined;
            onDelete?: ((...args: any[]) => any) | undefined;
            onComplete?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
        }, {}, {}, {}, {
            mountEl: string;
            zIndex: number;
            modelValue: string | number;
            timeout: number;
            closable: boolean;
            usePadding: boolean;
            show: boolean;
            title: string;
            overlayColor: string;
            active: boolean;
            border: boolean;
            maxlength: number;
            showDecimal: boolean;
            showDelete: boolean;
            showComplete: boolean;
            deleteText: string;
            completeText: string;
            promiseEmpty: boolean;
            calibration: boolean;
            showX: boolean;
            random: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        showDecimal: {
            type: BooleanConstructor;
            default: boolean;
        };
        showDelete: {
            type: BooleanConstructor;
            default: boolean;
        };
        showComplete: {
            type: BooleanConstructor;
            default: boolean;
        };
        show: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        closable: {
            type: BooleanConstructor;
            default: boolean;
        };
        maxlength: {
            type: NumberConstructor;
            default: number;
        };
        deleteText: {
            type: StringConstructor;
            default: string;
        };
        completeText: {
            type: StringConstructor;
            default: string;
        };
        promiseEmpty: {
            type: BooleanConstructor;
            default: boolean;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        overlayColor: {
            type: StringConstructor;
            default: string;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        calibration: {
            type: BooleanConstructor;
            default: boolean;
        };
        showX: {
            type: BooleanConstructor;
            default: boolean;
        };
        random: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: null;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onShowing?: ((...args: any[]) => any) | undefined;
        onShown?: ((...args: any[]) => any) | undefined;
        onHide?: ((...args: any[]) => any) | undefined;
        onHidding?: ((...args: any[]) => any) | undefined;
        onHidden?: ((...args: any[]) => any) | undefined;
        onInput?: ((...args: any[]) => any) | undefined;
        "onUpdate:show"?: ((...args: any[]) => any) | undefined;
        onDelete?: ((...args: any[]) => any) | undefined;
        onComplete?: ((...args: any[]) => any) | undefined;
    }, {
        $$el: import("vue").ComputedRef<HTMLElement | null>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        show: (...args: any[]) => void;
        showing: (...args: any[]) => void;
        shown: (...args: any[]) => void;
        hide: (...args: any[]) => void;
        hidding: (...args: any[]) => void;
        hidden: (...args: any[]) => void;
        input: (...args: any[]) => void;
        delete: (...args: any[]) => void;
        complete: (...args: any[]) => void;
        "update:show": (...args: any[]) => void;
    }, string, {
        mountEl: string;
        zIndex: number;
        modelValue: string | number;
        timeout: number;
        closable: boolean;
        usePadding: boolean;
        show: boolean;
        title: string;
        overlayColor: string;
        active: boolean;
        border: boolean;
        maxlength: number;
        showDecimal: boolean;
        showDelete: boolean;
        showComplete: boolean;
        deleteText: string;
        completeText: string;
        promiseEmpty: boolean;
        calibration: boolean;
        showX: boolean;
        random: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
            delete?(_: {}): any;
            complete?(_: {}): any;
        };
    });
    Toast: {
        $el?: HTMLElement | undefined;
        $instance?: App<Element> | undefined;
        $vm?: import("vue").ComponentInternalInstance | undefined;
        initParams: (options: string | import("./components/toast/props").ToastPropsType) => import("./components/toast/props").ToastPropsType;
        showToast: (options: string | import("./components/toast/props").ToastPropsType) => void;
        hideToast: () => void;
        install: (app: App<any>) => void;
    };
    PullRefresh: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            pullingText: {
                type: StringConstructor;
                default: string;
            };
            loosingText: {
                type: StringConstructor;
                default: string;
            };
            loadingText: {
                type: StringConstructor;
                default: string;
            };
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            pullingIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            loosingIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            loadingIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: () => {
                    type: string;
                    spin: boolean;
                };
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            distance: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onRefresh?: ((...args: any[]) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            refresh: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            pullingText: {
                type: StringConstructor;
                default: string;
            };
            loosingText: {
                type: StringConstructor;
                default: string;
            };
            loadingText: {
                type: StringConstructor;
                default: string;
            };
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            pullingIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            loosingIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            loadingIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: () => {
                    type: string;
                    spin: boolean;
                };
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            distance: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onRefresh?: ((...args: any[]) => any) | undefined;
        }, {
            modelValue: boolean;
            disabled: boolean;
            loadingText: string;
            pullingText: string;
            loosingText: string;
            pullingIcon: string | import("./components/icon/props").IconPropsType;
            loosingIcon: string | import("./components/icon/props").IconPropsType;
            loadingIcon: string | import("./components/icon/props").IconPropsType;
            distance: number;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            pullingText: {
                type: StringConstructor;
                default: string;
            };
            loosingText: {
                type: StringConstructor;
                default: string;
            };
            loadingText: {
                type: StringConstructor;
                default: string;
            };
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            pullingIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            loosingIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: string;
            };
            loadingIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: () => {
                    type: string;
                    spin: boolean;
                };
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            distance: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onRefresh?: ((...args: any[]) => any) | undefined;
        }, {}, {}, {}, {}, {
            modelValue: boolean;
            disabled: boolean;
            loadingText: string;
            pullingText: string;
            loosingText: string;
            pullingIcon: string | import("./components/icon/props").IconPropsType;
            loosingIcon: string | import("./components/icon/props").IconPropsType;
            loadingIcon: string | import("./components/icon/props").IconPropsType;
            distance: number;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        pullingText: {
            type: StringConstructor;
            default: string;
        };
        loosingText: {
            type: StringConstructor;
            default: string;
        };
        loadingText: {
            type: StringConstructor;
            default: string;
        };
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        pullingIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        loosingIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: string;
        };
        loadingIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: () => {
                type: string;
                spin: boolean;
            };
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        distance: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onRefresh?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        refresh: (...args: any[]) => void;
    }, string, {
        modelValue: boolean;
        disabled: boolean;
        loadingText: string;
        pullingText: string;
        loosingText: string;
        pullingIcon: string | import("./components/icon/props").IconPropsType;
        loosingIcon: string | import("./components/icon/props").IconPropsType;
        loadingIcon: string | import("./components/icon/props").IconPropsType;
        distance: number;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            el?(_: {
                status: import("./components/pull-refresh/props").PullRefreshStatusType;
            }): any;
            default?(_: {}): any;
        };
    });
    Dialog: import("./components/dialog").DialogType;
    SwipeCell: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            close: (...args: any[]) => void;
            open: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
        }, Readonly<import("vue").ExtractPropTypes<{
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
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        close: (...args: any[]) => void;
        open: (...args: any[]) => void;
    }, string, {
        disabled: boolean;
        centerClose: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            left?(_: {}): any;
            default?(_: {}): any;
            right?(_: {}): any;
        };
    });
    Tabbar: import("vue").DefineComponent<{
        modelValue: {
            type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
            default: null;
        };
        tabs: {
            type: import("vue").PropType<import("./components/tabbar/props").TabbarItemPropsType[]>;
            default: () => never[];
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
        activeColor: {
            type: StringConstructor;
            default: null;
        };
        inactiveColor: {
            type: StringConstructor;
            default: null;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        flex: {
            type: StringConstructor;
            default: null;
        };
        offset: {
            type: StringConstructor;
            default: null;
        };
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
        "item-click": (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
            default: null;
        };
        tabs: {
            type: import("vue").PropType<import("./components/tabbar/props").TabbarItemPropsType[]>;
            default: () => never[];
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
        activeColor: {
            type: StringConstructor;
            default: null;
        };
        inactiveColor: {
            type: StringConstructor;
            default: null;
        };
        active: {
            type: BooleanConstructor;
            default: boolean;
        };
        flex: {
            type: StringConstructor;
            default: null;
        };
        offset: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
        "onItem-click"?: ((...args: any[]) => any) | undefined;
    }, {
        zIndex: number;
        modelValue: string | number | Record<string, any> | unknown[];
        fixed: boolean;
        offset: string;
        active: boolean;
        border: boolean;
        activeColor: string;
        inactiveColor: string;
        tabs: import("./components/tabbar/props").TabbarItemPropsType[];
        flex: string;
    }, {}>;
    Table: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            data: {
                type: import("vue").PropType<any[]>;
                default: () => never[];
            };
            columns: {
                type: import("vue").PropType<import("./components/table/props").TableColumnType[]>;
                default: () => never[];
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            columnBorder: {
                type: BooleanConstructor;
                default: boolean;
            };
            stripe: {
                type: BooleanConstructor;
                default: boolean;
            };
            height: {
                type: StringConstructor;
                default: null;
            };
            noDataMsg: {
                type: StringConstructor;
                default: string;
            };
            loading: {
                type: BooleanConstructor;
                default: boolean;
            };
            loadText: {
                type: StringConstructor;
                default: string;
            };
            center: {
                type: BooleanConstructor;
                default: boolean;
            };
            cellClass: {
                type: import("vue").PropType<(row: any, rowIndex: number, column: import("./components/table/props").TableColumnType, columnIndex: number) => string>;
                default: null;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            onCheck?: ((...args: any[]) => any) | undefined;
            "onSort-cancel"?: ((...args: any[]) => any) | undefined;
            "onSort-asc"?: ((...args: any[]) => any) | undefined;
            "onSort-desc"?: ((...args: any[]) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            check: (...args: any[]) => void;
            "sort-cancel": (...args: any[]) => void;
            "sort-asc": (...args: any[]) => void;
            "sort-desc": (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            data: {
                type: import("vue").PropType<any[]>;
                default: () => never[];
            };
            columns: {
                type: import("vue").PropType<import("./components/table/props").TableColumnType[]>;
                default: () => never[];
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            columnBorder: {
                type: BooleanConstructor;
                default: boolean;
            };
            stripe: {
                type: BooleanConstructor;
                default: boolean;
            };
            height: {
                type: StringConstructor;
                default: null;
            };
            noDataMsg: {
                type: StringConstructor;
                default: string;
            };
            loading: {
                type: BooleanConstructor;
                default: boolean;
            };
            loadText: {
                type: StringConstructor;
                default: string;
            };
            center: {
                type: BooleanConstructor;
                default: boolean;
            };
            cellClass: {
                type: import("vue").PropType<(row: any, rowIndex: number, column: import("./components/table/props").TableColumnType, columnIndex: number) => string>;
                default: null;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            onCheck?: ((...args: any[]) => any) | undefined;
            "onSort-cancel"?: ((...args: any[]) => any) | undefined;
            "onSort-asc"?: ((...args: any[]) => any) | undefined;
            "onSort-desc"?: ((...args: any[]) => any) | undefined;
        }, {
            data: any[];
            loading: boolean;
            height: string;
            border: boolean;
            center: boolean;
            activeColor: string;
            loadText: string;
            columns: import("./components/table/props").TableColumnType[];
            columnBorder: boolean;
            stripe: boolean;
            noDataMsg: string;
            cellClass: (row: any, rowIndex: number, column: import("./components/table/props").TableColumnType, columnIndex: number) => string;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            data: {
                type: import("vue").PropType<any[]>;
                default: () => never[];
            };
            columns: {
                type: import("vue").PropType<import("./components/table/props").TableColumnType[]>;
                default: () => never[];
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            columnBorder: {
                type: BooleanConstructor;
                default: boolean;
            };
            stripe: {
                type: BooleanConstructor;
                default: boolean;
            };
            height: {
                type: StringConstructor;
                default: null;
            };
            noDataMsg: {
                type: StringConstructor;
                default: string;
            };
            loading: {
                type: BooleanConstructor;
                default: boolean;
            };
            loadText: {
                type: StringConstructor;
                default: string;
            };
            center: {
                type: BooleanConstructor;
                default: boolean;
            };
            cellClass: {
                type: import("vue").PropType<(row: any, rowIndex: number, column: import("./components/table/props").TableColumnType, columnIndex: number) => string>;
                default: null;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            onCheck?: ((...args: any[]) => any) | undefined;
            "onSort-cancel"?: ((...args: any[]) => any) | undefined;
            "onSort-asc"?: ((...args: any[]) => any) | undefined;
            "onSort-desc"?: ((...args: any[]) => any) | undefined;
        }, {}, {}, {}, {}, {
            data: any[];
            loading: boolean;
            height: string;
            border: boolean;
            center: boolean;
            activeColor: string;
            loadText: string;
            columns: import("./components/table/props").TableColumnType[];
            columnBorder: boolean;
            stripe: boolean;
            noDataMsg: string;
            cellClass: (row: any, rowIndex: number, column: import("./components/table/props").TableColumnType, columnIndex: number) => string;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        data: {
            type: import("vue").PropType<any[]>;
            default: () => never[];
        };
        columns: {
            type: import("vue").PropType<import("./components/table/props").TableColumnType[]>;
            default: () => never[];
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        columnBorder: {
            type: BooleanConstructor;
            default: boolean;
        };
        stripe: {
            type: BooleanConstructor;
            default: boolean;
        };
        height: {
            type: StringConstructor;
            default: null;
        };
        noDataMsg: {
            type: StringConstructor;
            default: string;
        };
        loading: {
            type: BooleanConstructor;
            default: boolean;
        };
        loadText: {
            type: StringConstructor;
            default: string;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
        cellClass: {
            type: import("vue").PropType<(row: any, rowIndex: number, column: import("./components/table/props").TableColumnType, columnIndex: number) => string>;
            default: null;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        onCheck?: ((...args: any[]) => any) | undefined;
        "onSort-cancel"?: ((...args: any[]) => any) | undefined;
        "onSort-asc"?: ((...args: any[]) => any) | undefined;
        "onSort-desc"?: ((...args: any[]) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        check: (...args: any[]) => void;
        "sort-cancel": (...args: any[]) => void;
        "sort-asc": (...args: any[]) => void;
        "sort-desc": (...args: any[]) => void;
    }, string, {
        data: any[];
        loading: boolean;
        height: string;
        border: boolean;
        center: boolean;
        activeColor: string;
        loadText: string;
        columns: import("./components/table/props").TableColumnType[];
        columnBorder: boolean;
        stripe: boolean;
        noDataMsg: string;
        cellClass: (row: any, rowIndex: number, column: import("./components/table/props").TableColumnType, columnIndex: number) => string;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            custom?(_: {
                row: any;
                rowIndex: number;
                column: {
                    type?: "default" | "custom" | "selection" | undefined;
                    label?: string | undefined;
                    prop: string;
                    width?: string | number | undefined;
                    className?: string | undefined;
                    hidden?: boolean | undefined;
                    sortable?: boolean | undefined;
                    format?: ((val: any, row: any, column: import("./components/table/props").TableColumnType) => string) | undefined;
                    selectable?: ((row: any, rowIndex: number) => boolean) | undefined;
                    sortMethod?: ((sortOrder: import("./components/table/props").TableSortOrderType, sortBy: string, rows: any, column: import("./components/table/props").TableColumnType) => void) | undefined;
                    ellipsis?: boolean | undefined;
                };
                columnIndex: number;
            }): any;
        };
    });
    Tabs: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            type: {
                type: import("vue").PropType<"default" | "card">;
                default: string;
                validator(value: any): boolean;
            };
            modelValue: {
                type: NumberConstructor;
                default: number;
            };
            animation: {
                type: import("vue").PropType<"fade" | "none" | "slide">;
                default: string;
                validator(value: any): boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            /***** 组件 *****/
            ellipsis: {
                type: BooleanConstructor;
                default: boolean;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            flex: {
                type: import("vue").PropType<import("./components/tabs/props").TabsFlexType>;
                default: string;
            };
            offset: {
                type: StringConstructor;
                default: string;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            setHeight: () => void;
            setSlider: () => void;
            to: (newValue: number, oldValue: number) => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            change: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            type: {
                type: import("vue").PropType<"default" | "card">;
                default: string;
                validator(value: any): boolean;
            };
            modelValue: {
                type: NumberConstructor;
                default: number;
            };
            animation: {
                type: import("vue").PropType<"fade" | "none" | "slide">;
                default: string;
                validator(value: any): boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            /***** 组件 *****/
            ellipsis: {
                type: BooleanConstructor;
                default: boolean;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            flex: {
                type: import("vue").PropType<import("./components/tabs/props").TabsFlexType>;
                default: string;
            };
            offset: {
                type: StringConstructor;
                default: string;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            modelValue: number;
            timeout: number;
            type: "default" | "card";
            offset: string;
            animation: "fade" | "none" | "slide";
            border: boolean;
            activeColor: string;
            ellipsis: boolean;
            flex: import("./components/tabs/props").TabsFlexType;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            type: {
                type: import("vue").PropType<"default" | "card">;
                default: string;
                validator(value: any): boolean;
            };
            modelValue: {
                type: NumberConstructor;
                default: number;
            };
            animation: {
                type: import("vue").PropType<"fade" | "none" | "slide">;
                default: string;
                validator(value: any): boolean;
            };
            timeout: {
                type: NumberConstructor;
                default: number;
            };
            /***** 组件 *****/
            ellipsis: {
                type: BooleanConstructor;
                default: boolean;
            };
            border: {
                type: BooleanConstructor;
                default: boolean;
            };
            flex: {
                type: import("vue").PropType<import("./components/tabs/props").TabsFlexType>;
                default: string;
            };
            offset: {
                type: StringConstructor;
                default: string;
            };
            activeColor: {
                type: StringConstructor;
                default: null;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            setHeight: () => void;
            setSlider: () => void;
            to: (newValue: number, oldValue: number) => void;
        }, {}, {}, {}, {
            modelValue: number;
            timeout: number;
            type: "default" | "card";
            offset: string;
            animation: "fade" | "none" | "slide";
            border: boolean;
            activeColor: string;
            ellipsis: boolean;
            flex: import("./components/tabs/props").TabsFlexType;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        type: {
            type: import("vue").PropType<"default" | "card">;
            default: string;
            validator(value: any): boolean;
        };
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        animation: {
            type: import("vue").PropType<"fade" | "none" | "slide">;
            default: string;
            validator(value: any): boolean;
        };
        timeout: {
            type: NumberConstructor;
            default: number;
        };
        /***** 组件 *****/
        ellipsis: {
            type: BooleanConstructor;
            default: boolean;
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        flex: {
            type: import("vue").PropType<import("./components/tabs/props").TabsFlexType>;
            default: string;
        };
        offset: {
            type: StringConstructor;
            default: string;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        setHeight: () => void;
        setSlider: () => void;
        to: (newValue: number, oldValue: number) => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, {
        modelValue: number;
        timeout: number;
        type: "default" | "card";
        offset: string;
        animation: "fade" | "none" | "slide";
        border: boolean;
        activeColor: string;
        ellipsis: boolean;
        flex: import("./components/tabs/props").TabsFlexType;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Tab: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            title: {
                type: StringConstructor;
                default: string;
            };
            icon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            placement: {
                type: import("vue").PropType<"left" | "right">;
                default: string;
                validator(value: any): boolean;
            };
        }>>, {
            show: boolean;
            firstShow: boolean;
            back: boolean;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            title: {
                type: StringConstructor;
                default: string;
            };
            icon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            placement: {
                type: import("vue").PropType<"left" | "right">;
                default: string;
                validator(value: any): boolean;
            };
        }>>, {
            title: string;
            disabled: boolean;
            icon: string | import("./components/icon/props").IconPropsType;
            placement: "left" | "right";
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            title: {
                type: StringConstructor;
                default: string;
            };
            icon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: null;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            placement: {
                type: import("vue").PropType<"left" | "right">;
                default: string;
                validator(value: any): boolean;
            };
        }>>, {
            show: boolean;
            firstShow: boolean;
            back: boolean;
        }, {}, {}, {}, {
            title: string;
            disabled: boolean;
            icon: string | import("./components/icon/props").IconPropsType;
            placement: "left" | "right";
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        icon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        placement: {
            type: import("vue").PropType<"left" | "right">;
            default: string;
            validator(value: any): boolean;
        };
    }>>, {
        show: boolean;
        firstShow: boolean;
        back: boolean;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        title: string;
        disabled: boolean;
        icon: string | import("./components/icon/props").IconPropsType;
        placement: "left" | "right";
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    Carousel: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: NumberConstructor;
                default: number;
            };
            autoplay: {
                type: BooleanConstructor;
                default: boolean;
            };
            loop: {
                type: BooleanConstructor;
                default: boolean;
            };
            speed: {
                type: NumberConstructor;
                default: number;
            };
            interval: {
                type: NumberConstructor;
                default: number;
            };
            mode: {
                type: import("vue").PropType<"fade" | "slide">;
                default: string;
                validator(value: any): boolean;
            };
            indicators: {
                type: import("vue").PropType<boolean | import("./components/carousel/props").CarouselIndicatorsType>;
                default: boolean;
            };
            controls: {
                type: BooleanConstructor;
                default: boolean;
            };
            vertical: {
                type: BooleanConstructor;
                default: boolean;
            };
            touchable: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            setPrev: () => void;
            setNext: () => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            change: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: NumberConstructor;
                default: number;
            };
            autoplay: {
                type: BooleanConstructor;
                default: boolean;
            };
            loop: {
                type: BooleanConstructor;
                default: boolean;
            };
            speed: {
                type: NumberConstructor;
                default: number;
            };
            interval: {
                type: NumberConstructor;
                default: number;
            };
            mode: {
                type: import("vue").PropType<"fade" | "slide">;
                default: string;
                validator(value: any): boolean;
            };
            indicators: {
                type: import("vue").PropType<boolean | import("./components/carousel/props").CarouselIndicatorsType>;
                default: boolean;
            };
            controls: {
                type: BooleanConstructor;
                default: boolean;
            };
            vertical: {
                type: BooleanConstructor;
                default: boolean;
            };
            touchable: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            modelValue: number;
            mode: "fade" | "slide";
            autoplay: boolean;
            loop: boolean;
            speed: number;
            interval: number;
            indicators: boolean | import("./components/carousel/props").CarouselIndicatorsType;
            controls: boolean;
            vertical: boolean;
            touchable: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: NumberConstructor;
                default: number;
            };
            autoplay: {
                type: BooleanConstructor;
                default: boolean;
            };
            loop: {
                type: BooleanConstructor;
                default: boolean;
            };
            speed: {
                type: NumberConstructor;
                default: number;
            };
            interval: {
                type: NumberConstructor;
                default: number;
            };
            mode: {
                type: import("vue").PropType<"fade" | "slide">;
                default: string;
                validator(value: any): boolean;
            };
            indicators: {
                type: import("vue").PropType<boolean | import("./components/carousel/props").CarouselIndicatorsType>;
                default: boolean;
            };
            controls: {
                type: BooleanConstructor;
                default: boolean;
            };
            vertical: {
                type: BooleanConstructor;
                default: boolean;
            };
            touchable: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            setPrev: () => void;
            setNext: () => void;
        }, {}, {}, {}, {
            modelValue: number;
            mode: "fade" | "slide";
            autoplay: boolean;
            loop: boolean;
            speed: number;
            interval: number;
            indicators: boolean | import("./components/carousel/props").CarouselIndicatorsType;
            controls: boolean;
            vertical: boolean;
            touchable: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: NumberConstructor;
            default: number;
        };
        autoplay: {
            type: BooleanConstructor;
            default: boolean;
        };
        loop: {
            type: BooleanConstructor;
            default: boolean;
        };
        speed: {
            type: NumberConstructor;
            default: number;
        };
        interval: {
            type: NumberConstructor;
            default: number;
        };
        mode: {
            type: import("vue").PropType<"fade" | "slide">;
            default: string;
            validator(value: any): boolean;
        };
        indicators: {
            type: import("vue").PropType<boolean | import("./components/carousel/props").CarouselIndicatorsType>;
            default: boolean;
        };
        controls: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        touchable: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        setPrev: () => void;
        setNext: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, {
        modelValue: number;
        mode: "fade" | "slide";
        autoplay: boolean;
        loop: boolean;
        speed: number;
        interval: number;
        indicators: boolean | import("./components/carousel/props").CarouselIndicatorsType;
        controls: boolean;
        vertical: boolean;
        touchable: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
            indicators?(_: {
                total: number;
            }): any;
            controls?(_: {
                total: number;
            }): any;
        };
    });
    CarouselItem: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{}>>, {}, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}, {}, {}, {}>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {}): any;
        };
    });
    RichImage: import("vue").DefineComponent<{
        src: {
            type: StringConstructor;
            default: string;
        };
        loadIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        errorIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        maxScale: {
            type: NumberConstructor;
            default: number;
        };
        minScale: {
            type: NumberConstructor;
            default: number;
        };
    }, {
        leftRotate: () => void;
        rightRotate: () => void;
        scaleUp: () => void;
        scaleDown: () => void;
        reset: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        reset: (...args: any[]) => void;
        "double-touchstart": (...args: any[]) => void;
        "double-touchend": (...args: any[]) => void;
        "translate-touchstart": (...args: any[]) => void;
        "translate-touchend": (...args: any[]) => void;
        "translate-mousedown": (...args: any[]) => void;
        "translate-mouseup": (...args: any[]) => void;
        "only-click": (...args: any[]) => void;
    }, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
        src: {
            type: StringConstructor;
            default: string;
        };
        loadIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        errorIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: null;
        };
        maxScale: {
            type: NumberConstructor;
            default: number;
        };
        minScale: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        onReset?: ((...args: any[]) => any) | undefined;
        "onDouble-touchstart"?: ((...args: any[]) => any) | undefined;
        "onDouble-touchend"?: ((...args: any[]) => any) | undefined;
        "onTranslate-touchstart"?: ((...args: any[]) => any) | undefined;
        "onTranslate-touchend"?: ((...args: any[]) => any) | undefined;
        "onTranslate-mousedown"?: ((...args: any[]) => any) | undefined;
        "onTranslate-mouseup"?: ((...args: any[]) => any) | undefined;
        "onOnly-click"?: ((...args: any[]) => any) | undefined;
    }, {
        src: string;
        loadIcon: string | import("./components/icon/props").IconPropsType;
        errorIcon: string | import("./components/icon/props").IconPropsType;
        maxScale: number;
        minScale: number;
    }, {}>;
    ImagePreview: {
        new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            images: {
                type: import("vue").PropType<string[]>;
                default: () => never[];
            };
            descriptions: {
                type: import("vue").PropType<string[]>;
                default: () => never[];
            };
            active: {
                type: NumberConstructor;
                default: number;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            mode: {
                type: import("vue").PropType<"fade" | "slide" | undefined>;
                default: string;
            };
            controls: {
                type: BooleanConstructor;
                default: boolean;
            };
            loop: {
                type: BooleanConstructor;
                default: boolean;
            };
            showPage: {
                type: BooleanConstructor;
                default: boolean;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            useTools: {
                type: BooleanConstructor;
                default: boolean;
            };
            errorIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: {
                    size: string;
                    type: string;
                };
            };
            loadIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: () => {
                    size: string;
                    type: string;
                };
            };
            maxScale: {
                type: NumberConstructor;
                default: number;
            };
            minScale: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            "update:modelValue": (...args: any[]) => void;
            change: (...args: any[]) => void;
        }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            images: {
                type: import("vue").PropType<string[]>;
                default: () => never[];
            };
            descriptions: {
                type: import("vue").PropType<string[]>;
                default: () => never[];
            };
            active: {
                type: NumberConstructor;
                default: number;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            mode: {
                type: import("vue").PropType<"fade" | "slide" | undefined>;
                default: string;
            };
            controls: {
                type: BooleanConstructor;
                default: boolean;
            };
            loop: {
                type: BooleanConstructor;
                default: boolean;
            };
            showPage: {
                type: BooleanConstructor;
                default: boolean;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            useTools: {
                type: BooleanConstructor;
                default: boolean;
            };
            errorIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: {
                    size: string;
                    type: string;
                };
            };
            loadIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: () => {
                    size: string;
                    type: string;
                };
            };
            maxScale: {
                type: NumberConstructor;
                default: number;
            };
            minScale: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            mountEl: string;
            zIndex: number;
            modelValue: boolean;
            usePadding: boolean;
            active: number;
            loadIcon: string | import("./components/icon/props").IconPropsType;
            mode: "fade" | "slide" | undefined;
            loop: boolean;
            controls: boolean;
            errorIcon: string | import("./components/icon/props").IconPropsType;
            maxScale: number;
            minScale: number;
            images: string[];
            descriptions: string[];
            showPage: boolean;
            useTools: boolean;
        }, true, {}, {}, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
            images: {
                type: import("vue").PropType<string[]>;
                default: () => never[];
            };
            descriptions: {
                type: import("vue").PropType<string[]>;
                default: () => never[];
            };
            active: {
                type: NumberConstructor;
                default: number;
            };
            mountEl: {
                type: StringConstructor;
                default: null;
            };
            zIndex: {
                type: NumberConstructor;
                default: number;
            };
            mode: {
                type: import("vue").PropType<"fade" | "slide" | undefined>;
                default: string;
            };
            controls: {
                type: BooleanConstructor;
                default: boolean;
            };
            loop: {
                type: BooleanConstructor;
                default: boolean;
            };
            showPage: {
                type: BooleanConstructor;
                default: boolean;
            };
            usePadding: {
                type: BooleanConstructor;
                default: boolean;
            };
            useTools: {
                type: BooleanConstructor;
                default: boolean;
            };
            errorIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: {
                    size: string;
                    type: string;
                };
            };
            loadIcon: {
                type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
                default: () => {
                    size: string;
                    type: string;
                };
            };
            maxScale: {
                type: NumberConstructor;
                default: number;
            };
            minScale: {
                type: NumberConstructor;
                default: number;
            };
        }>> & {
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChange?: ((...args: any[]) => any) | undefined;
        }, {
            $$el: import("vue").ComputedRef<HTMLElement | null>;
        }, {}, {}, {}, {
            mountEl: string;
            zIndex: number;
            modelValue: boolean;
            usePadding: boolean;
            active: number;
            loadIcon: string | import("./components/icon/props").IconPropsType;
            mode: "fade" | "slide" | undefined;
            loop: boolean;
            controls: boolean;
            errorIcon: string | import("./components/icon/props").IconPropsType;
            maxScale: number;
            minScale: number;
            images: string[];
            descriptions: string[];
            showPage: boolean;
            useTools: boolean;
        }>;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        images: {
            type: import("vue").PropType<string[]>;
            default: () => never[];
        };
        descriptions: {
            type: import("vue").PropType<string[]>;
            default: () => never[];
        };
        active: {
            type: NumberConstructor;
            default: number;
        };
        mountEl: {
            type: StringConstructor;
            default: null;
        };
        zIndex: {
            type: NumberConstructor;
            default: number;
        };
        mode: {
            type: import("vue").PropType<"fade" | "slide" | undefined>;
            default: string;
        };
        controls: {
            type: BooleanConstructor;
            default: boolean;
        };
        loop: {
            type: BooleanConstructor;
            default: boolean;
        };
        showPage: {
            type: BooleanConstructor;
            default: boolean;
        };
        usePadding: {
            type: BooleanConstructor;
            default: boolean;
        };
        useTools: {
            type: BooleanConstructor;
            default: boolean;
        };
        errorIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: {
                size: string;
                type: string;
            };
        };
        loadIcon: {
            type: import("vue").PropType<string | import("./components/icon/props").IconPropsType>;
            default: () => {
                size: string;
                type: string;
            };
        };
        maxScale: {
            type: NumberConstructor;
            default: number;
        };
        minScale: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        $$el: import("vue").ComputedRef<HTMLElement | null>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
        change: (...args: any[]) => void;
    }, string, {
        mountEl: string;
        zIndex: number;
        modelValue: boolean;
        usePadding: boolean;
        active: number;
        loadIcon: string | import("./components/icon/props").IconPropsType;
        mode: "fade" | "slide" | undefined;
        loop: boolean;
        controls: boolean;
        errorIcon: string | import("./components/icon/props").IconPropsType;
        maxScale: number;
        minScale: number;
        images: string[];
        descriptions: string[];
        showPage: boolean;
        useTools: boolean;
    }, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            page?(_: {
                total: number;
                current: number;
            }): any;
            tools?(_: {}): any;
            descriptions?(_: {
                total: number;
                current: number;
            }): any;
        };
    });
};
/***** 全局导出 *****/
declare const install: (app: App) => void;
/***** 版本号 *****/
declare const version = "1.9.7";
declare const stdin_default: {
    install: (app: App) => void;
    version: string;
};
export { stdin_default as default, install, version };
