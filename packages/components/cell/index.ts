import { withInstall } from '@/utils'
import cell from './cell.vue'
export type * from './props'

const Cell = withInstall(cell)
export { Cell, Cell as default }
