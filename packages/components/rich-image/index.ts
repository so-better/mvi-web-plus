import { withInstall } from '@/utils'
import richImage from './rich-image.vue'
export type * from './props'

const RichImage = withInstall(richImage)
export { RichImage, RichImage as default }
