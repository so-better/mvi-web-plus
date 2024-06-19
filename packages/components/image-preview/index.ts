import { withInstall } from '@/utils'
import imagePreview from './image-preview.vue'
export type * from './props'

const ImagePreview = withInstall(imagePreview)
export { ImagePreview, ImagePreview as default }
