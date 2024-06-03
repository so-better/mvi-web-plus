import { FunctionPlugin } from 'vue';
import { MsgboxPropsType } from './props';

type MsgboxType = {
    initParams: (options: string | MsgboxPropsType) => MsgboxPropsType;
    msgbox: (options: string | MsgboxPropsType) => Promise<void>;
};
declare const Msgbox: MsgboxType;
declare const install: FunctionPlugin;
export { Msgbox, install as default };
