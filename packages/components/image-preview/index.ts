import { withInstall } from '@/utils'
import imagePreview from './image-preview.vue'

const ImagePreview = withInstall(imagePreview)

export type * from '@/components/image-preview/props'
export { ImagePreview, ImagePreview as default }
