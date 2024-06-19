import { withInstall } from '@/utils'
import overlay from './overlay.vue'
export type * from './props'

const Overlay = withInstall(overlay)
export { Overlay, Overlay as default }
