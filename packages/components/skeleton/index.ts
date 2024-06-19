import { withInstall } from '@/utils'
import skeleton from './skeleton.vue'
export type * from './props'

const Skeleton = withInstall(skeleton)
export { Skeleton, Skeleton as default }
