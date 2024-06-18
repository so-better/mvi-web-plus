import { App, ComponentInternalInstance, FunctionPlugin } from 'vue';
import { LoadingBarPropsType } from './props';
type LoadingBarType = {
    $el?: HTMLElement;
    $instance?: App<Element>;
    $vm?: ComponentInternalInstance;
    initParams: (options: string | LoadingBarPropsType) => LoadingBarPropsType;
    showLoadingBar: (options: string | LoadingBarPropsType) => Promise<void>;
    hideLoadingBar: () => void;
};
declare const LoadingBar: LoadingBarType;
declare const install: FunctionPlugin;
export { LoadingBar, install as default };
