import { withInstall } from '@/utils'
import row from './row.vue'

const Row = withInstall(row)

export type * from '@/components/row/props'
export { Row, Row as default }
