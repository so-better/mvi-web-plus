import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
export type DropdownOptionsItemType = {
    label?: string;
    value?: string;
    disabled?: boolean;
    icon?: string | IconPropsType;
};
export declare const DropdownProps: {
    modelValue: {
        type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
        default: null;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
    options: {
        type: PropType<DropdownOptionsItemType[]>;
        default: () => never[];
    };
    selectedClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectedIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    show: {
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
    placement: {
        type: PropType<"left" | "top" | "bottom" | "right" | undefined>;
        default: string;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type DropdownPropsType = ExtractPublicPropTypes<typeof DropdownProps>;
