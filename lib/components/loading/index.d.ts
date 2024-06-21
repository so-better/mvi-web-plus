export type * from './props';
declare const Loading: import('../../utils').SFCWithInstall<import("vue").DefineComponent<{
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
    size: string;
    type: "default" | "circle" | "spin" | "dots" | "transfer";
    color: string;
}, {}>>;
export { Loading, Loading as default };
