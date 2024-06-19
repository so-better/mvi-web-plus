import { withInstall } from '@/utils'
import tabs from './tabs.vue'
export type * from './props'

const Tabs = withInstall(tabs)
export { Tabs, Tabs as default }
