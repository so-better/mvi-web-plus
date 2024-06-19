import { withInstall } from '@/utils'
import search from './search.vue'

const Search = withInstall(search)

export type * from '@/components/search/props'
export { Search, Search as default }
