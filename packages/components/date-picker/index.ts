import { withInstall } from '@/utils'
import datePicker from './date-picker.vue'

const DatePicker = withInstall(datePicker)

export type * from '@/components/date-picker/props'
export { DatePicker, DatePicker as default }
