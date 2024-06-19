import { withInstall } from '@/utils'
import dropdown from './dropdown.vue'

const Dropdown = withInstall(dropdown)

export type * from '@/components/dropdown/props'
export { Dropdown, Dropdown as default }
