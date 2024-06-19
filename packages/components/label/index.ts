import { withInstall } from '@/utils'
import label from './label.vue'
export type * from './props'

const Label = withInstall(label)
export { Label, Label as default }
