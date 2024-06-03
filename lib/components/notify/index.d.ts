import { App, ComponentInternalInstance, FunctionPlugin } from 'vue';
import { NotifyPropsType } from './props';

type NotifyType = {
    $el?: HTMLElement;
    $instance?: App<Element>;
    $vm?: ComponentInternalInstance;
    initParams: (options: string | NotifyPropsType) => NotifyPropsType;
    showNotify: (options: NotifyPropsType) => Promise<void>;
    hideNotify: () => void;
};
declare const Notify: NotifyType;
declare const install: FunctionPlugin;
export { Notify, install as default };
