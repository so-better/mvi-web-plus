import { withInstall } from '@/utils'
import collapseItem from './collapse-item.vue'

const CollapseItem = withInstall(collapseItem)

export type * from '@/components/collapse-item/props'
export { CollapseItem, CollapseItem as default }
