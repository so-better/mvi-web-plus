import { withInstall } from '@/utils'
import dateNativePicker from './date-native-picker.vue'

const DateNativePicker = withInstall(dateNativePicker)

export type * from '@/components/date-native-picker/props'
export { DateNativePicker, DateNativePicker as default }
