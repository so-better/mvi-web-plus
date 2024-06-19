import { withInstall } from '@/utils'
import numberKeyboard from './number-keyboard.vue'
export type * from './props'

const NumberKeyboard = withInstall(numberKeyboard)
export { NumberKeyboard, NumberKeyboard as default }
