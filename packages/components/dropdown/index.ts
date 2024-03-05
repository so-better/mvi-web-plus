import { App } from 'vue'
import Dropdown from './dropdown.vue'

Dropdown.install = (app: App) => {
	app.component(Dropdown.name, Dropdown)
}

export { Dropdown, Dropdown as default }
