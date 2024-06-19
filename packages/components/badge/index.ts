import { withInstall } from '@/utils'
import badge from '@/components/badge/badge.vue'

const Badge = withInstall(badge)

export type * from '@/components/badge/props'
export { Badge, Badge as default }
