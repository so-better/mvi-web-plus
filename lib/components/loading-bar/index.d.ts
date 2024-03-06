import { App, ComponentInternalInstance } from 'vue';
import { LoadingBarPropsType } from './props';
interface LoadingBarType {
    $el?: HTMLElement;
    $instance?: App<Element>;
    $vm?: ComponentInternalInstance;
    initParams: (options: string | LoadingBarPropsType) => LoadingBarPropsType;
    showLoadingBar: (options: string | LoadingBarPropsType) => void;
    hideLoadingBar: () => void;
    install: (app: App) => void;
}
declare const LoadingBar: LoadingBarType;
export { LoadingBar, LoadingBar as default };
