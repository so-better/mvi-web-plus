import { DefineComponent } from 'vue';
import { ActionsheetOptionsItemType } from '../../types/ActionsheetOptionsItem';
declare const _default: DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: import("vue").PropType<ActionsheetOptionsItemType[]>;
        default: () => never[];
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    selectClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: import("vue").PropType<"medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
}, {
    $$el: import("vue").ComputedRef<HTMLElement>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    select: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: null;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: import("vue").PropType<ActionsheetOptionsItemType[]>;
        default: () => never[];
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    selectClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: import("vue").PropType<"medium" | "large">;
        default: string;
        validator(value: any): boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
}, {
    mountEl: string;
    zIndex: number;
    modelValue: boolean;
    timeout: number;
    closable: boolean;
    usePadding: boolean;
    title: string;
    size: "medium" | "large";
    overlayColor: string;
    round: boolean;
    options: ActionsheetOptionsItemType[];
    showCancel: boolean;
    cancelText: string;
    active: boolean;
    selectClose: boolean;
}, {}>;
export default _default;
