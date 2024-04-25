import { App, FunctionPlugin } from 'vue'
import Select from './select.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Select.name!, Select)
}

export { Select, install as default }
