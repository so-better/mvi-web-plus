import { ExtractPublicPropTypes } from 'vue';

export declare const OverlayProps: {
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    fade: {
        type: BooleanConstructor;
        default: boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
        validator(value: any): boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type OverlayPropsType = ExtractPublicPropTypes<typeof OverlayProps>;
