import { App, ComponentInternalInstance } from 'vue';
import { NotifyPropsType } from './props';
export type * from './props';
type NotifyType = {
    $el?: HTMLElement;
    $instance?: App<Element>;
    $vm?: ComponentInternalInstance;
    initParams: (options: string | NotifyPropsType) => NotifyPropsType;
    install: (app: App) => void;
    showNotify: (options: NotifyPropsType) => Promise<void>;
    hideNotify: () => void;
};
declare const Notify: NotifyType;
export { Notify, Notify as default };
