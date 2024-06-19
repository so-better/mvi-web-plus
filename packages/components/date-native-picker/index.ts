import { withInstall } from '@/utils'
import dateNativePicker from './date-native-picker.vue'
export type * from './props'

const DateNativePicker = withInstall(dateNativePicker)
export { DateNativePicker, DateNativePicker as default }
