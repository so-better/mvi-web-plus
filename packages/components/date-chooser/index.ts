import { withInstall } from '@/utils'
import dateChooser from './date-chooser.vue'

const DateChooser = withInstall(dateChooser)

export type * from '@/components/date-chooser/props'
export { DateChooser, DateChooser as default }
