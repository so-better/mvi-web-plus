import { withInstall } from '@/utils'
import actionsheet from '@/components/actionsheet/actionsheet.vue'

const Actionsheet = withInstall(actionsheet)

export type * from '@/components/actionsheet/props'
export { Actionsheet, Actionsheet as default }
