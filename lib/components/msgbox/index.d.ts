import { App } from 'vue';
interface MsgboxType {
    initParams: (options: any) => any;
    msgbox: (options: any) => void;
    install: (app: App) => void;
}
declare const Msgbox: MsgboxType;
export { Msgbox, Msgbox as default };
