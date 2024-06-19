import { withInstall } from '@/utils'
import tabs from './tabs.vue'

const Tabs = withInstall(tabs)

export type * from '@/components/tabs/props'
export { Tabs, Tabs as default }
