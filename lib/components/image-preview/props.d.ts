import { ExtractPublicPropTypes, PropType } from 'vue';
import { CarouselPropsType } from '../carousel';
import { IconPropsType } from '../icon';

export declare const ImagePreviewProps: {
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    images: {
        type: PropType<string[]>;
        default: () => never[];
    };
    descriptions: {
        type: PropType<string[]>;
        default: () => never[];
    };
    active: {
        type: NumberConstructor;
        default: number;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    mode: {
        type: PropType<CarouselPropsType["mode"]>;
        default: string;
    };
    controls: {
        type: BooleanConstructor;
        default: boolean;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPage: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    useTools: {
        type: BooleanConstructor;
        default: boolean;
    };
    errorIcon: {
        type: PropType<string | IconPropsType>;
        default: {
            size: string;
            type: string;
        };
    };
    loadIcon: {
        type: PropType<string | IconPropsType>;
        default: () => {
            size: string;
            type: string;
        };
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
export type ImagePreviewPropsType = ExtractPublicPropTypes<typeof ImagePreviewProps>;
