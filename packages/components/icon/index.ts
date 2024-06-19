import { withInstall } from '@/utils'
import icon from './icon.vue'
export type * from './props'

const Icon = withInstall(icon)
export { Icon, Icon as default }
