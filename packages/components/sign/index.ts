import { withInstall } from '@/utils'
import sign from './sign.vue'

const Sign = withInstall(sign)

export type * from '@/components/sign/props'
export { Sign, Sign as default }
