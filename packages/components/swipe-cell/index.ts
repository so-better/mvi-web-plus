import { withInstall } from '@/utils'
import swipeCell from './swipe-cell.vue'
export type * from './props'

const SwipeCell = withInstall(swipeCell)
export { SwipeCell, SwipeCell as default }
