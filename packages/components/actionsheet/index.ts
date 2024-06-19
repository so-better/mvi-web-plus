import { withInstall } from '@/utils'
import actionsheet from './actionsheet.vue'
export type * from './props'

const Actionsheet = withInstall(actionsheet)
export { Actionsheet, Actionsheet as default }
