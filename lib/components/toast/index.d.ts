import { App, ComponentInternalInstance } from 'vue';
import { ToastPropsType } from './props';
type ToastType = {
    $el?: HTMLElement;
    $instance?: App<Element>;
    $vm?: ComponentInternalInstance;
    initParams: (options: string | ToastPropsType) => ToastPropsType;
    showToast: (options: string | ToastPropsType) => void;
    hideToast: () => void;
    install: (app: App) => void;
};
declare const Toast: ToastType;
export { Toast, Toast as default };
