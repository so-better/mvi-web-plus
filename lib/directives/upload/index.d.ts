import { FunctionPlugin } from 'vue';
import { default as Upload } from './upload';

declare const install: FunctionPlugin;
export { Upload, install as default };
