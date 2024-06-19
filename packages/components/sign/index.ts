import { withInstall } from '@/utils'
import sign from './sign.vue'
export type * from './props'

const Sign = withInstall(sign)
export { Sign, Sign as default }
