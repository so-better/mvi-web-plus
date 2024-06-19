import { withInstall } from '@/utils'
import numberKeyboard from './number-keyboard.vue'

const NumberKeyboard = withInstall(numberKeyboard)

export type * from '@/components/number-keyboard/props'
export { NumberKeyboard, NumberKeyboard as default }
