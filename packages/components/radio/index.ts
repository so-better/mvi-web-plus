import { withInstall } from '@/utils'
import radio from './radio.vue'

const Radio = withInstall(radio)

export type * from '@/components/radio/props'
export { Radio, Radio as default }
