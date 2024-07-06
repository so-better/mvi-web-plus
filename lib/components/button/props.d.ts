import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon';

export declare const ButtonProps: {
    type: {
        type: PropType<"default" | "info" | "success" | "error" | "warn" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: PropType<"mini" | "small" | "medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: PropType<HTMLButtonElement["type"]>;
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
        type: PropType<string | IconPropsType>;
        default: () => {
            type: string;
            spin: boolean;
        };
    };
};
declare const publicButtonProps: {
    text: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: PropType<"default" | "info" | "success" | "error" | "warn" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: PropType<"mini" | "small" | "medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    nativeType: {
        type: PropType<HTMLButtonElement["type"]>;
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
        type: PropType<string | IconPropsType>;
        default: () => {
            type: string;
            spin: boolean;
        };
    };
};
export type ButtonPropsType = ExtractPublicPropTypes<typeof publicButtonProps>;
export {};
