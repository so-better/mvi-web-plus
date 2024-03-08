import { App } from 'vue'
import NumberKeyboard from './number-keyboard.vue'

NumberKeyboard.install = (app: App) => {
	app.component(NumberKeyboard.name!, NumberKeyboard)
}

export { NumberKeyboard, NumberKeyboard as default }
