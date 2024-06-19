import { withInstall } from '@/utils'
import triangle from './triangle.vue'
export type * from './props'

const Triangle = withInstall(triangle)
export { Triangle, Triangle as default }
