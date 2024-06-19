import { withInstall } from '@/utils'
import tooltip from './tooltip.vue'
export type * from './props'

const Tooltip = withInstall(tooltip)
export { Tooltip, Tooltip as default }
