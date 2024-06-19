import { withInstall } from '@/utils'
import _switch from './switch.vue'

const Switch = withInstall(_switch)

export type * from '@/components/switch/props'
export { Switch, Switch as default }
