import { default as Prop } from './prop';

declare const PropDirective: import('../../utils').SFCWithInstall<{
    mounted(el: any, binding: import('vue').DirectiveBinding<any>): void;
    updated(el: any, binding: import('vue').DirectiveBinding<any>): void;
    beforeUnmount(el: any): void;
}>;
export type * from './prop';
export { Prop, PropDirective, PropDirective as default };
