import { withInstall } from '@/utils'
import transitionSlide from './transition-slide.vue'
export type * from './props'

const TransitionSlide = withInstall(transitionSlide)
export { TransitionSlide, TransitionSlide as default }
