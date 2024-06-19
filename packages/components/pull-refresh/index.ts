import { withInstall } from '@/utils'
import pullRefresh from './pull-refresh.vue'
export type * from './props'

const PullRefresh = withInstall(pullRefresh)
export { PullRefresh, PullRefresh as default }
