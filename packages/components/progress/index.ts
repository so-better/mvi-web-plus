import { withInstall } from '@/utils'
import progress from './progress.vue'

const Progress = withInstall(progress)

export type * from '@/components/progress/props'
export { Progress, Progress as default }
