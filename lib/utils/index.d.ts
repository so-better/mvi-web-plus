import { ComponentInternalInstance, Ref } from 'vue';
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
