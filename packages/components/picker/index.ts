import { withInstall } from '@/utils'
import picker from './picker.vue'
export type * from './props'

const Picker = withInstall(picker)
export { Picker, Picker as default }
