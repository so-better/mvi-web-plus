import { withInstall } from '@/utils'
import roll from './roll.vue'
export type * from './props'

const Roll = withInstall(roll)
export { Roll, Roll as default }
