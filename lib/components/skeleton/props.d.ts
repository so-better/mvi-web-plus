import { ExtractPublicPropTypes, PropType } from 'vue';
export declare const SkeletonProps: {
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    rows: {
        type: NumberConstructor;
        default: number;
        validator(value: number): boolean;
    };
    rowWidth: {
        type: PropType<string | string[]>;
        default: null;
    };
    avatar: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: BooleanConstructor;
        default: boolean;
    };
    titleWidth: {
        type: StringConstructor;
        default: null;
    };
    animation: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    avatarSize: {
        type: StringConstructor;
        default: null;
    };
    avatarRound: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type SkeletonPropsType = ExtractPublicPropTypes<typeof SkeletonProps>;
