import { ExtractPublicPropTypes, PropType } from 'vue';

export type TabsFlexType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
export declare const TabsProps: {
    type: {
        type: PropType<"default" | "card">;
        default: string;
        validator(value: any): boolean;
    };
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    animation: {
        type: PropType<"none" | "slide" | "fade">;
        default: string;
        validator(value: any): boolean;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    ellipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    flex: {
        type: PropType<TabsFlexType>;
        default: string;
    };
    offset: {
        type: StringConstructor;
        default: string;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
};
export type TabsPropsType = ExtractPublicPropTypes<typeof TabsProps>;
