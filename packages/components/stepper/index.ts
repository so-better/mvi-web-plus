import { withInstall } from '@/utils'
import stepper from './stepper.vue'

const Stepper = withInstall(stepper)

export type * from '@/components/stepper/props'
export { Stepper, Stepper as default }
