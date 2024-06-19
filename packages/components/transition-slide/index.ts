import { withInstall } from '@/utils'
import transitionSlide from './transition-slide.vue'

const TransitionSlide = withInstall(transitionSlide)

export type * from '@/components/transition-slide/props'
export { TransitionSlide, TransitionSlide as default }
