import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon';

export declare const TabProps: {
    title: {
        type: StringConstructor;
        default: string;
    };
    icon: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: PropType<"left" | "right">;
        default: string;
        validator(value: any): boolean;
    };
};
export type TabPropsType = ExtractPublicPropTypes<typeof TabProps>;
