import { App, ComponentInternalInstance } from 'vue';
interface LoadingBarType {
    $el?: HTMLElement;
    $instance?: App<Element>;
    $vm?: ComponentInternalInstance;
    initParams: (options: any) => any;
    showLoadingBar: (options: any) => void;
    hideLoadingBar: () => void;
    install: (app: App) => void;
}
declare const LoadingBar: LoadingBarType;
export { LoadingBar, LoadingBar as default };
