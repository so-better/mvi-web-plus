import { withInstall } from '@/utils'
import collapse from './collapse.vue'
export type * from './props'

const Collapse = withInstall(collapse)
export { Collapse, Collapse as default }
