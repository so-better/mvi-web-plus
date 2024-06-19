import { withInstall } from '@/utils'
import popup from './popup.vue'

const Popup = withInstall(popup)

export type * from '@/components/popup/props'
export { Popup, Popup as default }
