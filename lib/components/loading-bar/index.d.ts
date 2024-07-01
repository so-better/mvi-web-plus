import { App, ComponentInternalInstance } from 'vue';
import { LoadingBarPropsType } from './props';

export type * from './props';
type LoadingBarType = {
    $el?: HTMLElement;
    $instance?: App<Element>;
    $vm?: ComponentInternalInstance;
    initParams: (options: string | LoadingBarPropsType) => LoadingBarPropsType;
    install: (app: App) => void;
    showLoadingBar: (options: string | LoadingBarPropsType) => Promise<void>;
    hideLoadingBar: () => void;
};
declare const LoadingBar: LoadingBarType;
export { LoadingBar, LoadingBar as default };
