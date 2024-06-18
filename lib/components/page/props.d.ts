import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
export declare const PageProps: {
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    total: {
        type: NumberConstructor;
        default: number;
    };
    overNumber: {
        type: NumberConstructor;
        default: number;
        validator(value: any): boolean;
    };
    prevText: {
        type: StringConstructor;
        default: null;
    };
    nextText: {
        type: StringConstructor;
        default: null;
    };
    prevIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    nextIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    simple: {
        type: BooleanConstructor;
        default: boolean;
    };
    firstText: {
        type: StringConstructor;
        default: null;
    };
    lastText: {
        type: StringConstructor;
        default: null;
    };
    firstIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    lastIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type PagePropsType = ExtractPublicPropTypes<typeof PageProps>;
