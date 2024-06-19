import { withInstall } from '@/utils'
import tabbar from './tabbar.vue'

const Tabbar = withInstall(tabbar)

export type * from '@/components/tabbar/props'
export { Tabbar, Tabbar as default }
