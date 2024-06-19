import { withInstall } from '@/utils'
import _switch from './switch.vue'
export type * from './props'

const Switch = withInstall(_switch)
export { Switch, Switch as default }
