import { withInstall } from '@/utils'
import field from './field.vue'

const Field = withInstall(field)

export type * from '@/components/field/props'
export { Field, Field as default }
