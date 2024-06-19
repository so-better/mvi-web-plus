import { withInstall } from '@/utils'
import popup from './popup.vue'
export type * from './props'

const Popup = withInstall(popup)
export { Popup, Popup as default }
