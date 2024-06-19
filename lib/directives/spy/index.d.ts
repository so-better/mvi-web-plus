import { default as Spy } from './spy';

declare const SpyDirective: import('../../utils').SFCWithInstall<{
    mounted(el: any, binding: import('vue').DirectiveBinding<any>): void;
    beforeUnmount(el: any): void;
}>;
export type * from './spy';
export { Spy, SpyDirective, SpyDirective as default };
