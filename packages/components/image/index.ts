import { withInstall } from '@/utils'
import image from './image.vue'
export type * from './props'

const Image = withInstall(image)
export { Image, Image as default }
