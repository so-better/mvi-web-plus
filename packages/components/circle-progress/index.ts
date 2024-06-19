import { withInstall } from '@/utils'
import circleProgress from './circle-progress.vue'

const CircleProgress = withInstall(circleProgress)

export type * from '@/components/circle-progress/props'
export { CircleProgress, CircleProgress as default }
