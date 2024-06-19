import { withInstall } from '@/utils'
import collapseItem from './collapse-item.vue'
export type * from './props'

const CollapseItem = withInstall(collapseItem)
export { CollapseItem, CollapseItem as default }
