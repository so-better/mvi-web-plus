import { withInstall } from '@/utils'
import steps from './steps.vue'

const Steps = withInstall(steps)

export type * from '@/components/steps/props'
export { Steps, Steps as default }
