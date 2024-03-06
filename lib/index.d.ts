import { App } from 'vue';
/***** 全局默认样式 *****/
import './css/mvi-default.less';
/***** 辅助样式 *****/
import './css/mvi-support.less';
/***** 按需导出 *****/
export * from './directives/anchor';
export * from './directives/drag';
export * from './directives/observe';
export * from './directives/prop';
export * from './directives/px';
export * from './directives/resize';
export * from './directives/ripple';
export * from './directives/scroll';
export * from './directives/spy';
export * from './directives/upload';
export * from './components/icon';
export * from './components/badge';
export * from './components/button';
export * from './components/triangle';
export * from './components/layer';
export * from './components/label';
export * from './components/input';
export * from './components/loading';
export * from './components/loading-bar';
export * from './components/msgbox';
export * from './components/divider';
export * from './components/cell';
export * from './components/cell-group';
export * from './components/checkbox';
export * from './components/radio';
export * from './components/sign';
export * from './components/roll';
export * from './components/row';
export * from './components/col';
export * from './components/autocomplete';
export * from './components/overlay';
export * from './components/popup';
export * from './components/dropdown';
export * from './components/tooltip';
export * from './components/transition-slide';
export * from './components/switch';
export * from './components/navbar';
export * from './components/notify';
export * from './components/actionsheet';
export * from './components/calendar';
export * from './components/circle-progress';
export * from './components/collapse';
export * from './components/collapse-item';
export * from './components/date-chooser';
export * from './components/date-native-picker';
export * from './components/picker';
export * from './components/progress';
export * from './components/slider';
/***** 全局导出 *****/
declare const install: (app: App) => void;
/***** 版本号 *****/
declare const version = "1.9.4";
declare const stdin_default: {
    install: (app: App) => void;
    version: string;
};
export { stdin_default as default, install, version };
