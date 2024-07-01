import { ExtractPublicPropTypes } from 'vue';

export declare const CollapseProps: {
    modelValue: {
        type: (NumberConstructor | ArrayConstructor)[];
        default: null;
    };
    accordion: {
        type: BooleanConstructor;
        default: boolean;
    };
    inBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    outBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    noWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type CollapsePropsType = ExtractPublicPropTypes<typeof CollapseProps>;
