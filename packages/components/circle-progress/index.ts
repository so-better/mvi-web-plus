import { withInstall } from '@/utils'
import circleProgress from './circle-progress.vue'
export type * from './props'

const CircleProgress = withInstall(circleProgress)
export { CircleProgress, CircleProgress as default }
