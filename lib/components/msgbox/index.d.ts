import { App } from 'vue';
import { MsgboxPropsType } from './props';

type MsgboxType = {
    initParams: (options: string | MsgboxPropsType) => MsgboxPropsType;
    install: (app: App) => void;
    msgbox: (options: string | MsgboxPropsType) => Promise<void>;
};
declare const Msgbox: MsgboxType;
export type * from './props';
export { Msgbox, Msgbox as default };
