import { withInstall } from '@/utils'
import input from './input.vue'
export type * from './props'

const Input = withInstall(input)
export { Input, Input as default }
