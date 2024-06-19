export type * from './props';
declare const ColorPicker: import('../../utils').SFCWithInstall<import('vue').DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    showAlpha: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    showAlpha: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
    showAlpha: boolean;
}, {}>>;
export { ColorPicker, ColorPicker as default };
