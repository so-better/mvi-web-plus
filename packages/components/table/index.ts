import { withInstall } from '@/utils'
import table from './table.vue'

const Table = withInstall(table)

export type * from '@/components/table/props'
export { Table, Table as default }
