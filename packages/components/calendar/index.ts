import { withInstall } from '@/utils'
import calendar from './calendar.vue'
export type * from './props'

const Calendar = withInstall(calendar)
export { Calendar, Calendar as default }
