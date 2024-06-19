import { withInstall } from '@/utils'
import pullRefresh from './pull-refresh.vue'

const PullRefresh = withInstall(pullRefresh)

export type * from '@/components/pull-refresh/props'
export { PullRefresh, PullRefresh as default }
