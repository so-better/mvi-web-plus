import { IconPropsType } from '../icon';
import { PullRefreshStatusType } from './props';

declare function __VLS_template(): {
    el?(_: {
        status: PullRefreshStatusType;
    }): any;
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<{
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
        type: import('vue').PropType<string | IconPropsType>;
        default: string;
    };
    loosingIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: string;
    };
    loadingIcon: {
        type: import('vue').PropType<string | IconPropsType>;
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
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    refresh: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
        type: import('vue').PropType<string | IconPropsType>;
        default: string;
    };
    loosingIcon: {
        type: import('vue').PropType<string | IconPropsType>;
        default: string;
    };
    loadingIcon: {
        type: import('vue').PropType<string | IconPropsType>;
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
    pullingIcon: string | IconPropsType;
    loosingIcon: string | IconPropsType;
    loadingIcon: string | IconPropsType;
    distance: number;
}, {}>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
