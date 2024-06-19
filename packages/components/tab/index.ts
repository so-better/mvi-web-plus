import { withInstall } from '@/utils'
import tab from './tab.vue'

const Tab = withInstall(tab)

export type * from '@/components/tab/props'
export { Tab, Tab as default }
