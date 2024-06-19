import { withInstall } from '@/utils'
import button from '@/components/button/button.vue'

const Button = withInstall(button)

export type * from '@/components/button/props'
export { Button, Button as default }
