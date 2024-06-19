import { withInstall } from '@/utils'
import label from './label.vue'

const Label = withInstall(label)

export type * from '@/components/label/props'
export { Label, Label as default }
