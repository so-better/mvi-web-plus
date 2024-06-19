import { withInstall } from '@/utils'
import skeleton from './skeleton.vue'

const Skeleton = withInstall(skeleton)

export type * from '@/components/skeleton/props'
export { Skeleton, Skeleton as default }
