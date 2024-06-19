import { withInstall } from '@/utils'
import badge from './badge.vue'
export type * from './props'

const Badge = withInstall(badge)
export { Badge, Badge as default }
