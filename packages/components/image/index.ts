import { withInstall } from '@/utils'
import image from './image.vue'

const Image = withInstall(image)

export type * from '@/components/image/props'
export { Image, Image as default }
