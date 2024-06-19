import { withInstall } from '@/utils'
import col from './col.vue'
export type * from './props'

const Col = withInstall(col)
export { Col, Col as default }
