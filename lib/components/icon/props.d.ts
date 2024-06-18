import { ExtractPublicPropTypes } from 'vue';
export declare const IconProps: {
    type: {
        type: StringConstructor;
        default: string;
    };
    spin: {
        type: BooleanConstructor;
        default: boolean;
    };
    url: {
        type: StringConstructor;
        default: null;
    };
    size: {
        type: StringConstructor;
        default: null;
    };
    color: {
        type: StringConstructor;
        default: null;
    };
};
export type IconPropsType = ExtractPublicPropTypes<typeof IconProps>;
