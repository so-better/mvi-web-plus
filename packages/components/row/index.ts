import { withInstall } from '@/utils'
import row from './row.vue'
export type * from './props'

const Row = withInstall(row)
export { Row, Row as default }
