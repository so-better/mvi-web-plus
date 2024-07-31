import { ExtractPublicPropTypes, PropType } from 'vue';

export declare const LabelProps: {
    type: {
        type: PropType<"default" | "info" | "success" | "warn" | "error" | "primary">;
        default: string;
        validator(value: any): boolean;
    };
    size: {
        type: PropType<"medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
    plain: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    mark: {
        type: BooleanConstructor;
        default: boolean;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type LabelPropsType = ExtractPublicPropTypes<typeof LabelProps>;
