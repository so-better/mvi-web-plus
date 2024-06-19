import { withInstall } from '@/utils'
import triangle from './triangle.vue'

const Triangle = withInstall(triangle)

export type * from '@/components/triangle/props'
export { Triangle, Triangle as default }
