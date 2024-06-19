import { default as Ripple } from './ripple';

declare const RippleDirective: import('../../utils').SFCWithInstall<{
    mounted(el: any, binding: import('vue').DirectiveBinding<any>): void;
    beforeUnmount(el: any): void;
}>;
export type * from './ripple';
export { Ripple, RippleDirective, RippleDirective as default };
