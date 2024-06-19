import { withInstall } from '@/utils'
import stepper from './stepper.vue'
export type * from './props'

const Stepper = withInstall(stepper)
export { Stepper, Stepper as default }
