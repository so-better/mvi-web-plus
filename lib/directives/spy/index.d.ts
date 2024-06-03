import { FunctionPlugin } from 'vue';
import { default as Spy } from './spy';

declare const install: FunctionPlugin;
export { Spy, install as default };
