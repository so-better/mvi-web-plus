import { withInstall } from '@/utils'
import search from './search.vue'
export type * from './props'

const Search = withInstall(search)
export { Search, Search as default }
