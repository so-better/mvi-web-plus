declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
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
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
