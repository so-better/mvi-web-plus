import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
export type ActionsheetOptionsItemType = {
    label?: string;
    loading?: boolean;
    icon?: IconPropsType;
    placement?: 'left' | 'right';
    disabled?: boolean;
};
export declare const ActionsheetProps: {
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: PropType<ActionsheetOptionsItemType[]>;
        default: () => never[];
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    selectClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<"medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
};
export type ActionsheetPropsType = ExtractPublicPropTypes<typeof ActionsheetProps>;
