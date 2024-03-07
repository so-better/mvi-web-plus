import { App, ComponentInternalInstance } from 'vue';
import { NotifyPropsType } from './props';
type NotifyType = {
    $el?: HTMLElement;
    $instance?: App<Element>;
    $vm?: ComponentInternalInstance;
    initParams: (options: string | NotifyPropsType) => NotifyPropsType;
    showNotify: (options: NotifyPropsType) => void;
    hideNotify: () => void;
    install: (app: App) => void;
};
declare const Notify: NotifyType;
export { Notify, Notify as default };
