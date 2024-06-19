import { withInstall } from '@/utils'
import select from './select.vue'
export type * from './props'

const Select = withInstall(select)
export { Select, Select as default }
