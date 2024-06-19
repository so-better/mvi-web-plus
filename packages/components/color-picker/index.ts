import { withInstall } from '@/utils'
import colorPicker from './color-picker.vue'
export type * from './props'

const ColorPicker = withInstall(colorPicker)
export { ColorPicker, ColorPicker as default }
