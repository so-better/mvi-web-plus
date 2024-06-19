import { withInstall } from '@/utils'
import datePicker from './date-picker.vue'
export type * from './props'

const DatePicker = withInstall(datePicker)
export { DatePicker, DatePicker as default }
