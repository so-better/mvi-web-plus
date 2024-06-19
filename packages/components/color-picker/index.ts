import { withInstall } from '@/utils'
import colorPicker from './color-picker.vue'

const ColorPicker = withInstall(colorPicker)

export type * from '@/components/color-picker/props'
export { ColorPicker, ColorPicker as default }
