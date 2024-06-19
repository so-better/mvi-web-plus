import { withInstall } from '@/utils'
import radio from './radio.vue'
export type * from './props'

const Radio = withInstall(radio)
export { Radio, Radio as default }
