import { App, FunctionPlugin } from 'vue'
import Input from './input.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Input.name!, Input)
}

export { Input, install as default }
