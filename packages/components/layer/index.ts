import { withInstall } from '@/utils'
import layer from './layer.vue'

const Layer = withInstall(layer)

export type * from '@/components/layer/props'
export { Layer, Layer as default }
