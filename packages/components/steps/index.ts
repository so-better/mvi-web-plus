import { withInstall } from '@/utils'
import steps from './steps.vue'
export type * from './props'

const Steps = withInstall(steps)
export { Steps, Steps as default }
