import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
export declare const StepsProps: {
    active: {
        type: NumberConstructor;
        default: number;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
    inactiveColor: {
        type: StringConstructor;
        default: null;
    };
    activeIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    inactiveIcon: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
};
export type StepsPropsType = ExtractPublicPropTypes<typeof StepsProps>;
