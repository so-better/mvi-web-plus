import { App, ComponentInternalInstance } from 'vue';
interface NotifyType {
    $el?: HTMLElement;
    $instance?: App<Element>;
    $vm?: ComponentInternalInstance;
    initParams: (options: any) => any;
    showNotify: (options: any) => void;
    hideNotify: () => void;
    install: (app: App) => void;
}
declare const Notify: NotifyType;
export { Notify, Notify as default };
