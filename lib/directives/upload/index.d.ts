import { default as Upload } from './upload';

declare const UploadDirective: import('../../utils').SFCWithInstall<{
    mounted(el: any, binding: import('vue').DirectiveBinding<any>): void;
}>;
export type * from './upload';
export { Upload, UploadDirective, UploadDirective as default };
