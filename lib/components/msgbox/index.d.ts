import { App } from 'vue';
import { MsgboxPropsType } from './props';

export type * from './props';
type MsgboxType = {
    initParams: (options: string | MsgboxPropsType) => MsgboxPropsType;
    install: (app: App) => void;
    msgbox: (options: string | MsgboxPropsType) => Promise<void>;
};
declare const Msgbox: MsgboxType;
export { Msgbox, Msgbox as default };
