import { withInstall } from '@/utils'
import select from './select.vue'

const Select = withInstall(select)

export type * from '@/components/select/props'
export { Select, Select as default }
