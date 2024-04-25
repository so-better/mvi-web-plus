import { App, ComponentInternalInstance, FunctionPlugin } from 'vue';
import { ToastPropsType } from './props';
type ToastType = {
    $el?: HTMLElement;
    $instance?: App<Element>;
    $vm?: ComponentInternalInstance;
    initParams: (options: string | ToastPropsType) => ToastPropsType;
    showToast: (options: string | ToastPropsType) => void;
    hideToast: () => void;
};
declare const Toast: ToastType;
declare const install: FunctionPlugin;
export { Toast, install as default };
