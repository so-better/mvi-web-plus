import { withInstall } from '@/utils'
import loading from './loading.vue'
export type * from './props'

const Loading = withInstall(loading)
export { Loading, Loading as default }
