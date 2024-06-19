import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon';

export declare const CellProps: {
    icon: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    content: {
        type: StringConstructor;
        default: null;
    };
    label: {
        type: StringConstructor;
        default: null;
    };
    border: {
        type: BooleanConstructor;
        default: null;
    };
    arrow: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: null;
    };
    ellipsis: {
        type: (BooleanConstructor | NumberConstructor)[];
        default: null;
    };
    noWrap: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type CellPropsType = ExtractPublicPropTypes<typeof CellProps>;
