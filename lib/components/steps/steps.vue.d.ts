import { DefineComponent } from 'vue';
declare const _default: __VLS_WithTemplateSlots<DefineComponent<{
    active: {
        type: NumberConstructor;
        default: number;
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
        type: import("vue").PropType<string | import("../icon/props").IconPropsType>;
        default: string;
    };
    inactiveIcon: {
        type: import("vue").PropType<string | import("../icon/props").IconPropsType>;
        default: null;
    };
}, {
    children: import("vue").Ref<DefineComponent[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    active: {
        type: NumberConstructor;
        default: number;
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
        type: import("vue").PropType<string | import("../icon/props").IconPropsType>;
        default: string;
    };
    inactiveIcon: {
        type: import("vue").PropType<string | import("../icon/props").IconPropsType>;
        default: null;
    };
}>>, {
    active: number;
    activeColor: string;
    vertical: boolean;
    activeIcon: string | import("../icon/props").IconPropsType;
    inactiveIcon: string | import("../icon/props").IconPropsType;
    inactiveColor: string;
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
