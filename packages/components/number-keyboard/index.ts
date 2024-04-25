import { App, FunctionPlugin } from 'vue'
import NumberKeyboard from './number-keyboard.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(NumberKeyboard.name!, NumberKeyboard)
}

export { NumberKeyboard, install as default }
