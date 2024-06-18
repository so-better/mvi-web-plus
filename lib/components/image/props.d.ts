import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
export type ImageFillType = 'fill' | 'cover' | 'contain' | 'response' | 'none';
export declare const ImageProps: {
    src: {
        type: StringConstructor;
        default: string;
    };
    fit: {
        type: PropType<ImageFillType>;
        default: string;
        validator(value: any): boolean;
    };
    alt: {
        type: StringConstructor;
        default: string;
    };
    showError: {
        type: BooleanConstructor;
        default: boolean;
    };
    showLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    lazyLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    root: {
        type: StringConstructor;
        default: null;
    };
    loadIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    errorIcon: {
        type: PropType<string | IconPropsType>;
        default: string;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
        default: null;
    };
    height: {
        type: StringConstructor;
        default: null;
    };
};
export type ImagePropsType = ExtractPublicPropTypes<typeof ImageProps>;
