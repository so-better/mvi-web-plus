import { withInstall } from '@/utils'
import carousel from '@/components/carousel/carousel.vue'

const Carousel = withInstall(carousel)

export type * from '@/components/carousel/props'
export { Carousel, Carousel as default }
