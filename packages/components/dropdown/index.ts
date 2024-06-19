import { withInstall } from '@/utils'
export type * from './props'
import dropdown from './dropdown.vue'

const Dropdown = withInstall(dropdown)
export { Dropdown, Dropdown as default }
