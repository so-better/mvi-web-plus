import { withInstall } from '@/utils'
import list from './list.vue'
export type * from './props'

const List = withInstall(list)
export { List, List as default }
