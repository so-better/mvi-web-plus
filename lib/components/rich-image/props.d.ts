import { ExtractPublicPropTypes, PropType } from 'vue';
import { IconPropsType } from '../icon/props';
export type RichImageDoubleTouchType = {
    is: boolean;
    spacing?: number;
};
export type RichImagePointType = {
    x: number;
    y: number;
};
export type RichImageCoverType = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
export declare const RichImageProps: {
    src: {
        type: StringConstructor;
        default: string;
    };
    loadIcon: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    errorIcon: {
        type: PropType<string | IconPropsType>;
        default: null;
    };
    maxScale: {
        type: NumberConstructor;
        default: number;
    };
    minScale: {
        type: NumberConstructor;
        default: number;
    };
};
export type RichImagePropsType = ExtractPublicPropTypes<typeof RichImageProps>;
