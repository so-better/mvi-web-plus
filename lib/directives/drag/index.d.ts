import { default as Drag } from './drag';

declare const DragDirective: import('../../utils').SFCWithInstall<{
    mounted(el: any, binding: import('vue').DirectiveBinding<any>): void;
    beforeUnmount(el: any): void;
}>;
export type * from './drag';
export { Drag, DragDirective, DragDirective as default };
