import { FunctionPlugin } from 'vue';
import { default as PullRefresh } from './pull-refresh.vue';

declare const install: FunctionPlugin;
export { PullRefresh, install as default };
