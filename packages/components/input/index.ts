import { withInstall } from '@/utils'
import input from './input.vue'

const Input = withInstall(input)

export type * from '@/components/input/props'
export { Input, Input as default }
