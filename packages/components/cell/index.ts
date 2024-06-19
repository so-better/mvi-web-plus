import { withInstall } from '@/utils'
import cell from './cell.vue'

const Cell = withInstall(cell)

export type * from '@/components/cell/props'
export { Cell, Cell as default }
