import { ExtractPublicPropTypes, PropType } from 'vue';
export declare const CheckboxProps: {
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
export type CheckboxPropsType = ExtractPublicPropTypes<typeof CheckboxProps>;
