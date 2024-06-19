import { withInstall } from '@/utils'
import loading from './loading.vue'

const Loading = withInstall(loading)

export type * from '@/components/loading/props'
export { Loading, Loading as default }
