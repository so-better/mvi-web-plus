import { FunctionPlugin } from 'vue';
import { default as Observe } from './observe';

declare const install: FunctionPlugin;
export { Observe, install as default };
