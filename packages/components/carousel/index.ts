import { withInstall } from '@/utils'
import carousel from './carousel.vue'
export type * from './props'

const Carousel = withInstall(carousel)
export { Carousel, Carousel as default }
