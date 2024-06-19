import { default as Observe } from './observe';

declare const ObserveDirective: import('../../utils').SFCWithInstall<{
    mounted(el: any, binding: import('vue').DirectiveBinding<any>): void;
}>;
export type * from './observe';
export { Observe, ObserveDirective, ObserveDirective as default };
