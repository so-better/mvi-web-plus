import { withInstall } from '@/utils'
import picker from './picker.vue'

const Picker = withInstall(picker)

export type * from '@/components/picker/props'
export { Picker, Picker as default }
