import { FunctionPlugin } from 'vue';
import { DialogPcPropsType, DialogPropsType } from './props';
export type DialogType = {
    initParams: (type: DialogPropsType['type'] | DialogPcPropsType['type'], options: string | DialogPropsType | DialogPcPropsType) => DialogPropsType | DialogPcPropsType;
    alert: (options: string | DialogPropsType) => void;
    confirm: (options: string | DialogPropsType) => void;
    prompt: (options: string | DialogPropsType) => void;
    Alert: (options: string | DialogPcPropsType) => void;
    Confirm: (options: string | DialogPcPropsType) => void;
    Prompt: (options: string | DialogPcPropsType) => void;
};
declare const Dialog: DialogType;
declare const install: FunctionPlugin;
export { Dialog, install as default };
