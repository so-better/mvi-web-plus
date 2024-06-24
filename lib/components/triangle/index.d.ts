export type * from './props';
declare const Triangle: import('../../utils').SFCWithInstall<import('vue').DefineComponent<{
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
        type: import('vue').PropType<"left" | "top" | "bottom" | "right">;
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
        type: import('vue').PropType<"left" | "top" | "bottom" | "right">;
        default: string;
        validator(value: any): boolean;
    };
}>>, {
    size: string;
    placement: "left" | "top" | "bottom" | "right";
    background: string;
    borderColor: string;
}, {}>>;
export { Triangle, Triangle as default };
