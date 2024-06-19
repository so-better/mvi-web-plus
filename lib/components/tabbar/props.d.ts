import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
import { BadgePropsType } from '../badge/props';

export type TabbarRouteType = {
    path?: string;
    name?: string;
    query?: object;
    params?: object;
    replace?: boolean;
};
export declare const TabbarItemProps: {
    route: {
        type: PropType<string | TabbarRouteType>;
        default: null;
    };
    icon: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    value: {
        type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    badge: {
        type: PropType<BadgePropsType>;
        default: null;
    };
};
export type TabbarItemPropsType = ExtractPublicPropTypes<typeof TabbarItemProps>;
export declare const TabbarProps: {
    modelValue: {
        type: (StringConstructor | NumberConstructor | ObjectConstructor | ArrayConstructor)[];
        default: null;
    };
    tabs: {
        type: PropType<TabbarItemPropsType[]>;
        default: () => never[];
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
    activeColor: {
        type: StringConstructor;
        default: null;
    };
    inactiveColor: {
        type: StringConstructor;
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    flex: {
        type: StringConstructor;
        default: null;
    };
    offset: {
        type: StringConstructor;
        default: null;
    };
};
export type TabbarPropsType = ExtractPublicPropTypes<typeof TabbarProps>;
