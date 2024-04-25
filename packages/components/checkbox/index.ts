import { App, FunctionPlugin } from 'vue'
import Checkbox from './checkbox.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Checkbox.name!, Checkbox)
}

export { Checkbox, install as default }
