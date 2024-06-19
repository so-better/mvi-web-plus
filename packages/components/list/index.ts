import { withInstall } from '@/utils'
import list from './list.vue'

const List = withInstall(list)

export type * from '@/components/list/props'
export { List, List as default }
