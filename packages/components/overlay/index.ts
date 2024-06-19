import { withInstall } from '@/utils'
import overlay from './overlay.vue'

const Overlay = withInstall(overlay)

export type * from '@/components/overlay/props'
export { Overlay, Overlay as default }
