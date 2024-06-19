import { withInstall } from '@/utils'
import cellGroup from './cell-group.vue'
export type * from './props'

const CellGroup = withInstall(cellGroup)
export { CellGroup, CellGroup as default }
