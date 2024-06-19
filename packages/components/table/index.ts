import { withInstall } from '@/utils'
import table from './table.vue'
export type * from './props'

const Table = withInstall(table)
export { Table, Table as default }
