import { withInstall } from '@/utils'
import dateChooser from './date-chooser.vue'
export type * from './props'

const DateChooser = withInstall(dateChooser)
export { DateChooser, DateChooser as default }
