import { withInstall } from '@/utils'
import tooltip from './tooltip.vue'

const Tooltip = withInstall(tooltip)

export type * from '@/components/tooltip/props'
export { Tooltip, Tooltip as default }
