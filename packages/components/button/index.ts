import { withInstall } from '@/utils'
import button from './button.vue'
export type * from './props'

const Button = withInstall(button)
export { Button, Button as default }
