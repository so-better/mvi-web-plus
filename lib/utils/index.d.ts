import { ComponentInternalInstance, Ref } from 'vue';
export declare const componentIsMatch: (instance: ComponentInternalInstance, childName: string, names: string[]) => void;
export declare const parentIsMatch: (children: Ref<ComponentInternalInstance[]> | null, parentInstance: ComponentInternalInstance | null, parentName: string, names: string[]) => void;
