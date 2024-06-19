import { App } from 'vue';
import { DialogPcPropsType, DialogPropsType } from './props';

export type DialogType = {
    initParams: (type: DialogPropsType['type'] | DialogPcPropsType['type'], options: string | DialogPropsType | DialogPcPropsType) => DialogPropsType | DialogPcPropsType;
    install: (app: App) => void;
    alert: (options: string | DialogPropsType) => Promise<void>;
    confirm: (options: string | DialogPropsType) => Promise<boolean>;
    prompt: (options: string | DialogPropsType) => Promise<{
        ok: boolean;
        value: string;
    }>;
    Alert: (options: string | DialogPcPropsType) => Promise<void>;
    Confirm: (options: string | DialogPcPropsType) => Promise<boolean>;
    Prompt: (options: string | DialogPcPropsType) => Promise<{
        ok: boolean;
        value: string;
    }>;
};
declare const Dialog: DialogType;
export type * from './props';
export { Dialog, Dialog as default };
