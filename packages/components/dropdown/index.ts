import { App, FunctionPlugin } from 'vue'
import Dropdown from './dropdown.vue'

const install: FunctionPlugin = (app: App) => {
	app.component(Dropdown.name!, Dropdown)
}

export { Dropdown, install as default }
