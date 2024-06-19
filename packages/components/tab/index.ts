import { withInstall } from '@/utils'
import tab from './tab.vue'
export type * from './props'

const Tab = withInstall(tab)
export { Tab, Tab as default }
