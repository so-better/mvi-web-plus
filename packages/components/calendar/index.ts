import { withInstall } from '@/utils'
import calendar from '@/components/calendar/calendar.vue'

const Calendar = withInstall(calendar)

export type * from '@/components/calendar/props'
export { Calendar, Calendar as default }
