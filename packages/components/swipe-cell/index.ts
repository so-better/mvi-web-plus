import { withInstall } from '@/utils'
import swipeCell from './swipe-cell.vue'

const SwipeCell = withInstall(swipeCell)

export type * from '@/components/swipe-cell/props'
export { SwipeCell, SwipeCell as default }
