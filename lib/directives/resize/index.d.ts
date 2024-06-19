import { default as Resize } from './resize';

declare const ResizeDirective: import('../../utils').SFCWithInstall<{
    mounted(el: any, binding: import('vue').DirectiveBinding<any>): void;
    beforeUnmount(el: any): void;
}>;
export type * from './resize';
export { Resize, ResizeDirective, ResizeDirective as default };
