import { ExtractPublicPropTypes } from 'vue';
export declare const ListProps: {
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    error: {
        type: BooleanConstructor;
        default: boolean;
    };
    finished: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadingText: {
        type: StringConstructor;
        default: string;
    };
    errorText: {
        type: StringConstructor;
        default: string;
    };
    finishedText: {
        type: StringConstructor;
        default: string;
    };
    immediateLoad: {
        type: BooleanConstructor;
        default: boolean;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    scrollEl: {
        type: StringConstructor;
        default: null;
    };
};
export type ListPropsType = ExtractPublicPropTypes<typeof ListProps>;
