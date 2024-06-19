import { withInstall } from '@/utils'
import progress from './progress.vue'
export type * from './props'

const Progress = withInstall(progress)
export { Progress, Progress as default }
