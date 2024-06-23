import { App, ComponentInternalInstance, Directive, Ref, Component } from 'vue';
export type SFCWithInstall<T> = T & {
    install(app: App): void;
};
/**
 * 判断组件默认插槽的内容是否都是指定的组件
 * @param instance
 * @param childName
 * @param names
 */
export declare const componentIsMatch: (instance: ComponentInternalInstance, childName: string, names: string[]) => void;
/**
 * 判断组件的父组件是不是指定的组件
 * @param children
 * @param parentInstance
 * @param parentName
 * @param names
 */
export declare const parentIsMatch: (children: Ref<ComponentInternalInstance[]> | null, parentInstance: ComponentInternalInstance | null, parentName: string, names: string[]) => void;
/**
 * 给组件增加install属性
 * @param component
 * @returns
 */
export declare const withInstall: <T extends Component>(component: T) => SFCWithInstall<T>;
/**
 * 给指令增加install属性
 * @param directive
 * @param name
 */
export declare const withInstallDirective: <T extends Directive>(name: string, directive: T) => SFCWithInstall<T>;
/**
 * 使用深色模式/浅色模式
 * @param dark
 */
export declare const useDark: (dark: boolean) => void;
/**
 * 当前是否深色模式
 * @returns
 */
export declare const isDark: () => boolean;
