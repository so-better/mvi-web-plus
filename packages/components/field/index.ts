import { withInstall } from '@/utils'
import field from './field.vue'
export type * from './props'

const Field = withInstall(field)
export { Field, Field as default }
