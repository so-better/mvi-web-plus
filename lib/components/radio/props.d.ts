import { ExtractPublicPropTypes, PropType } from 'vue';
export declare const RadioProps: {
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: (StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor)[];
        default: boolean;
    };
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
        type: PropType<"left" | "right">;
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
};
export type RadioPropsType = ExtractPublicPropTypes<typeof RadioProps>;
