import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon';
export declare const CollapseItemProps: {
    icon: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
};
export type CollapseItemPropsType = ExtractPublicPropTypes<typeof CollapseItemProps>;
