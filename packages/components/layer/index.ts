import { withInstall } from '@/utils'
import layer from './layer.vue'
export type * from './props'

const Layer = withInstall(layer)
export { Layer, Layer as default }
