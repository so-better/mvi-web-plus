import { App } from 'vue';
import { MsgboxPropsType } from './props';
interface MsgboxType {
    initParams: (options: string | MsgboxPropsType) => MsgboxPropsType;
    msgbox: (options: string | MsgboxPropsType) => void;
    install: (app: App) => void;
}
declare const Msgbox: MsgboxType;
export { Msgbox, Msgbox as default };
