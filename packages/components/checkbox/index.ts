import { withInstall } from '@/utils'
import checkbox from './checkbox.vue'

const Checkbox = withInstall(checkbox)

export type * from '@/components/checkbox/props'
export { Checkbox, Checkbox as default }
