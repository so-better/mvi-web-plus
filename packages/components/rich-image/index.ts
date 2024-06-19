import { withInstall } from '@/utils'
import richImage from './rich-image.vue'

const RichImage = withInstall(richImage)

export type * from '@/components/rich-image/props'
export { RichImage, RichImage as default }
