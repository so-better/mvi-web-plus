declare const _default: import('vue').DefineComponent<{
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
        type: import('vue').PropType<"top" | "left" | "right" | "bottom">;
        default: string;
        validator(value: any): boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
        type: import('vue').PropType<"top" | "left" | "right" | "bottom">;
        default: string;
        validator(value: any): boolean;
    };
}>>, {
    size: string;
    placement: "left" | "top" | "bottom" | "right";
    background: string;
    borderColor: string;
}, {}>;
export default _default;
