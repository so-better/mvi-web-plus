import { App } from 'vue'
import Input from './input.vue'

Input.install = (app: App) => {
	app.component(Input.name, Input)
}

export { Input, Input as default }
