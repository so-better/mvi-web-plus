import { TabbarRouteType } from './props';
import { IconPropsType } from '../icon/props';

declare const _default: import('vue').DefineComponent<{
    route: {
        type: import('vue').PropType<string | TabbarRouteType>;
        default: null;
    };
    icon: {
        type: import('vue').PropType<string | IconPropsType>;
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
        type: import('vue').PropType<import('../badge').BadgePropsType>;
        default: null;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    route: {
        type: import('vue').PropType<string | TabbarRouteType>;
        default: null;
    };
    icon: {
        type: import('vue').PropType<string | IconPropsType>;
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
        type: import('vue').PropType<import('../badge').BadgePropsType>;
        default: null;
    };
}>>, {
    name: string;
    disabled: boolean;
    icon: string | IconPropsType;
    value: string | number | Record<string, any> | unknown[];
    badge: {
        color?: string | undefined;
        show?: boolean | undefined;
        placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | undefined;
        offset?: string[] | undefined;
        background?: string | undefined;
        content?: string | number | undefined;
        dot?: boolean | undefined;
        block?: boolean | undefined;
    };
    route: string | TabbarRouteType;
}, {}>;
export default _default;
