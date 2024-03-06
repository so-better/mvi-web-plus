import { ExtractPublicPropTypes, PropType } from 'vue';
export declare const BadgeProps: {
    content: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    placement: {
        type: PropType<"top-right" | "top-left" | "bottom-right" | "bottom-left">;
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
        type: PropType<string[]>;
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
};
export type BadgePropsType = ExtractPublicPropTypes<typeof BadgeProps>;
