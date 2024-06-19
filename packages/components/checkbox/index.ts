import { withInstall } from '@/utils'
import checkbox from './checkbox.vue'
export type * from './props'

const Checkbox = withInstall(checkbox)

export { Checkbox, Checkbox as default }
