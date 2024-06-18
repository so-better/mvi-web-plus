import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
export declare const NavbarProps: {
    title: {
        type: StringConstructor;
        default: null;
    };
    leftText: {
        type: StringConstructor;
        default: null;
    };
    rightText: {
        type: StringConstructor;
        default: null;
    };
    leftIcon: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    rightIcon: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
};
export type NavbarPropsType = ExtractPublicPropTypes<typeof NavbarProps>;
