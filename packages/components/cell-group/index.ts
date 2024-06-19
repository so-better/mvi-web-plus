import { withInstall } from '@/utils'
import cellGroup from './cell-group.vue'

const CellGroup = withInstall(cellGroup)

export type * from '@/components/cell-group/props'
export { CellGroup, CellGroup as default }
