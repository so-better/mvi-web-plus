import { withInstall } from '@/utils'
import tabbar from './tabbar.vue'
export type * from './props'

const Tabbar = withInstall(tabbar)
export { Tabbar, Tabbar as default }
